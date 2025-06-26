'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res.ok) {
      router.push('/dashboard'); // 🔐 protected page
    } else {
      setError('Invalid email or password');
    }
  };

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center text-black'>
          Login
        </h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
          />
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition'
          >
            Log In
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className='w-full mt-4 bg-red-600 text-white py-3 rounded hover:bg-red-700 transition'
        >
          Continue with Google
        </button>

        {error && (
          <p className='mt-4 text-center text-sm text-red-600'>{error}</p>
        )}

        <p className='mt-4 text-center text-sm text-gray-600'>
          Don't have an account?{' '}
          <a href='/signup' className='text-blue-600 hover:underline'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
