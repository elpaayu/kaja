'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchComponent from './SearchComponent';
import UpdateToDone from './UpdateToDone';
import Link from 'next/link';

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function DashboardPendingBooking() {
  const [transactions, setTransactions] = useState([]);
  const [searchNotFound, setSearchNotFound] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios('/api/admin/transaction/read');
        const data = await response.data;

        const transactionStatus = data.filter((status) => status.status === 'PENDING');
        // Urutkan transaksi berdasarkan tanggal pembuatan secara descending (terbaru dulu)
        transactionStatus.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Slice the array to get the latest 5 transactions
        const latestTransactions = transactionStatus.slice(0, 5);

        setTransactions(latestTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);  

  const handleSearch = async (searchResults) => {
    let filteredTransactions = [];

    if (Array.isArray(searchResults)) {
      filteredTransactions = searchResults;
    } else if (searchResults.transactions) {
      filteredTransactions = searchResults.transactions;
    }
  
    // Filter out transactions with status DONE
    filteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.status !== 'DONE'
    );
  
    setTransactions(filteredTransactions);

    setSearchNotFound(filteredTransactions.length === 0);
  };  

  const updateTransactionStatus = async (transactionId) => {
    try {
      await axios.put(`/api/admin/transaction/${transactionId}`, {
        status: 'DONE',
      });
      const updatedTransactions = await fetchTransactions();
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error('Error updating transaction status:', error);
    }
  };

  const updateTransactionStatusFail = async (transactionId) => {
    try {
      await axios.put(`/api/admin/transaction/${transactionId}`, {
        status: 'CANCELED',
      });
      const updatedTransactions = await fetchTransactions();
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error('Error updating transaction status:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const day = ('0' + date.getDate()).slice(-2); 
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const year = ('0' + date.getFullYear()).slice(-4);

    return `${month}/${day}/${year}`;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return (
          <div className="badge badge-info gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Pending
          </div>
        );
      case 'PAID':
        return (
          <div className="badge badge-success gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Success
          </div>
        );
      case 'CANCELED':
        return (
          <div className="badge badge-error gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Fail
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='stat'>
      <div style={{backgroundColor: '#1d232a'}} className='-mx-6 mt-5 rounded-2xl p-5'> 
        <Link href={`/admin/transaction`}>
          <h2 className='stat-title'>5 Recent Orders</h2>
        </Link>
        <div style={{ overflowX: 'auto', maxHeight: '400px'}}>
          <div className="overflow-x-auto">
            {searchNotFound ? (
              <p className="text-center text-muted py-5">No results found.</p>
            ) : (
              <table className="table table-zebra text-center">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Code</th>
                    <th>Customer</th>
                    <th>Tour Name</th>
                    <th>Tour Date</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                  <tr key={transaction.id} className='text-center text-gray-400'>
                    <th>
                      <UpdateToDone transactions={transaction} onUpdate={updateTransactionStatus} toFail={updateTransactionStatusFail} />
                    </th>
                    <th>{transaction.id}</th>
                    <th>{transaction.user.name}</th>
                    <th>{transaction.tours.tourName}</th>
                    <th>{formatDate(transaction.booking_date)}</th>
                    <th>{transaction.quantity}</th>

                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <dialog id={`user_modal${transaction.id}`} className="modal">
                      <div className="modal-box bg-zinc-300 text-zinc-900">
                        <h3 className="font-semibold text-lg">Data of id user <span className='font-bold text-lg italic'>{transaction.user.id}</span></h3>
                        <p className="py-4"><span className='font-semibold'>Username:</span> {transaction.user.name}</p>
                        <p className=""><span className='font-semibold'>Email:</span> {transaction.user.email}</p>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>

                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <dialog id={`tour_modal${transaction.id}`} className="modal">
                      <div className="modal-box bg-zinc-300 text-zinc-900">
                        <h3 className="font-semibold text-lg">Data of id tour <span className='font-bold text-lg italic'>{transaction.tours.id}</span></h3>
                        <p className="py-4"><span className='font-semibold'>Tour name:</span> {transaction.tours.tourName}</p>
                        <p className=""><span className='font-semibold'>Tour price:</span> {transaction.tours.price} /person</p>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </tr>
                  ))}
                </tbody>
              </table>
            )}
            
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default DashboardPendingBooking;
