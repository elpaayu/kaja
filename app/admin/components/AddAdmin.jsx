
'use client';

import { Button, Modal, Label, TextInput, Checkbox } from 'flowbite-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

function AddAdmin() {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  function onCloseModal() {
    const modal = document.getElementById('my_modal_3');
    modal.close();
    setEmail('');
    setName('');
    setPassword('');
    setPhoneNumber('');
  }  

  const handleAddAdmin = async () => {
    try {
      const response = await fetch('/api/admin/admins/addAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          password,
          phoneNumber
        }),
      });

      if (response.ok) {
        toast.success("Success add admin");
        onCloseModal();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Error adding admin.")
        onCloseModal();
        console.error('Error adding admin');
      }
    } catch (error) {
      toast.error("Error adding admin.")
      onCloseModal();
      console.error('Error adding admin', error);
    }
  };

  return (
    <>
      <div onClick={()=>document.getElementById('my_modal_3').showModal()} className='pb-5 pt-2 text-zinc-400 cursor-pointer pl-2 hover:text-zinc-200'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-zinc-800">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-3">Add Admin</h3>

          <label className="form-control">
            <div className="label">
              <span className="label-text text-zinc-300">Email</span>
            </div>
            <input value={email} onChange={(event) => setEmail(event.target.value)} required type="email" placeholder="Type here" className="bg-transparent input input-bordered w-full max-w-lg" />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-zinc-300">Name</span>
            </div>
            <input value={name} onChange={(event) => setName(event.target.value)} required type="name" placeholder="Type here" className="bg-transparent input input-bordered w-full max-w-lg" />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-zinc-300">Password</span>
            </div>
            <input value={password} onChange={(event) => setPassword(event.target.value)} required type="password" placeholder="Type here" className="bg-transparent input input-bordered w-full max-w-lg" />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text text-zinc-300">Phone Number</span>
            </div>
            <input value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} required type="phone" placeholder="Type here" className="bg-transparent input input-bordered w-full max-w-lg" />
          </label>

          <div className="w-full mt-5">
            <button onClick={handleAddAdmin} className="btn orange rounded-3xl py-2 px-5">Add</button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default AddAdmin;
