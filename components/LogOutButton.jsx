'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/'); // 🔁 Redirect after session destroyed
  };

  return (
    <button
      onClick={handleLogout}
      className='mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition'
    >
      Logout
    </button>
  );
}
