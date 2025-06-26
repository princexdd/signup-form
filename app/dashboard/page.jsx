import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-green-100'>
      <div className='bg-white p-8 rounded shadow-md text-center'>
        <h1 className='text-3xl font-bold text-green-700 mb-4'>
          Welcome to the Dashboard!
        </h1>
        <p className='text-gray-700'>
          Logged in as <strong>{session.user.email}</strong>
        </p>
        <form action='/api/auth/signout' method='post'>
          <button className='mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'>
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
