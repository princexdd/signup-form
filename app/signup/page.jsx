'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/welcome'); // ✅ server session is already saved
      } else {
        setMessage(data.message || 'Something went wrong');
      }
    } catch (err) {
      setMessage('Server error, please try again');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center text-black'>
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            name='email'
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
          />
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition'
          >
            Register
          </button>
        </form>
        {message && (
          <p className='mt-4 text-center text-sm text-red-600'>{message}</p>
        )}
      </div>
    </div>
  );
}
