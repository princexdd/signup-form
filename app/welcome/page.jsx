import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import LogoutButton from '@/components/LogOutButton'; // ✅

export default async function WelcomePage() {
  const session = await getIronSession(cookies(), sessionOptions);
  const user = session.user;

  if (!user?.email) {
    return <meta httpEquiv='refresh' content='0;url=/signup' />;
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-green-100'>
      <div className='bg-white p-8 rounded shadow-md text-center'>
        <h1 className='text-3xl font-bold text-green-700 mb-4'>Welcome!</h1>
        <p className='text-gray-700'>
          Hi <strong>{user.email}</strong>, you have registered successfully 🎉
        </p>
        <LogoutButton /> {/* ✅ Button appears here */}
      </div>
    </div>
  );
}
