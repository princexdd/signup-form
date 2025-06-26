import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';

export async function POST(request) {
  const res = new Response(JSON.stringify({ message: 'Logged out' }), {
    status: 200,
  });

  const session = await getIronSession(request, res, sessionOptions);
  session.destroy(); // ❌ Clear session

  return res; // ✅ Return the same response to set empty cookie
}
