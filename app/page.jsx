'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center'>
      <h1 className='text-3xl font-bold text-black mb-4'>
        Welcome to the Signup App
      </h1>
      <Link
        href='/signup'
        className='mt-2 inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition'
      >
        Go to Signup
      </Link>
    </div>
  );
}
