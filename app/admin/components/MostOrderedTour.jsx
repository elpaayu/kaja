'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const MostOrderedTour = () => {
  const [mostOrderedTour, setMostOrderedTour] = useState(null);
  const [secondMostOrderedTour, setSecondMostOrderedTour] = useState(null);
  const [thirdMostOrderedTour, setThirdMostOrderedTour] = useState(null);
  const [fourthMostOrderedTour, setFourthMostOrderedTour] = useState(null);
  const [fifthMostOrderedTour, setFifthMostOrderedTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMostOrderedTours = async () => {
      try {
        // Fetch top two most ordered tours
        const mostOrderedToursResponse = await axios.get('/api/admin/mostOrderedTour');
        const topFiveTours = mostOrderedToursResponse.data.topFiveTours;
  
        // Set state for the first and second most ordered tours
        if (topFiveTours.length >= 1) {
          setMostOrderedTour(topFiveTours[0]);
        }
  
        if (topFiveTours.length >= 2) {
          setSecondMostOrderedTour(topFiveTours[1]);
        }

        if (topFiveTours.length >= 3) {
          setThirdMostOrderedTour(topFiveTours[2]);
        }

        if (topFiveTours.length >= 4) {
          setFourthMostOrderedTour(topFiveTours[3]);
        }

        if (topFiveTours.length >= 5) {
          setFifthMostOrderedTour(topFiveTours[4]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching most ordered tours:', error);
        setError('Error fetching most ordered tours. Please try again later.');
        setLoading(false);
      }
    };
  
    fetchMostOrderedTours();
  }, []);

  return (
    <div>
      <ul>
          <div className="overflow-x-auto">
          <table className="table">
            <tbody>
              <tr>
                <th>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                  </svg>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image src={mostOrderedTour ? mostOrderedTour.imageSrc[0] : '/placeholder-image.jpg'} width={120} height={120} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                    <div className="font-bold">{mostOrderedTour ? mostOrderedTour.tourName : 'Loading...'}</div>
                      {/* <div className="text-sm opacity-50">{customer.transactions.length} transactions</div> */}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                  </svg>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <Image src={mostOrderedTour ? secondMostOrderedTour.imageSrc[0] : '/placeholder-image.jpg'} width={120} height={120} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                    <div className="font-bold">{mostOrderedTour ? secondMostOrderedTour.tourName : 'Loading...'}</div>
                      {/* <div className="text-sm opacity-50">{customer.transactions.length} transactions</div> */}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                  </svg>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <Image src={mostOrderedTour ? thirdMostOrderedTour.imageSrc[0] : '/placeholder-image.jpg'} width={120} height={120} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                    <div className="font-bold">{mostOrderedTour ? thirdMostOrderedTour.tourName : 'Loading...'}</div>
                      {/* <div className="text-sm opacity-50">{customer.transactions.length} transactions</div> */}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                  </svg>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <Image src={mostOrderedTour ? fourthMostOrderedTour.imageSrc[0] : '/placeholder-image.jpg'} width={120} height={120} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                    <div className="font-bold">{mostOrderedTour ? fourthMostOrderedTour.tourName : 'Loading...'}</div>
                      {/* <div className="text-sm opacity-50">{customer.transactions.length} transactions</div> */}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                  </svg>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <Image src={mostOrderedTour ? fifthMostOrderedTour.imageSrc[0] : '/placeholder-image.jpg'} width={120} height={120} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                    <div className="font-bold">{mostOrderedTour ? fifthMostOrderedTour.tourName : 'Loading...'}</div>
                      {/* <div className="text-sm opacity-50">{customer.transactions.length} transactions</div> */}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>          
          </table>
        </div>
      </ul>
    </div>
  );
};

export default MostOrderedTour;