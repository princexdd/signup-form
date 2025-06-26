import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  const { email } = await request.json();

  if (!email) {
    return new Response(JSON.stringify({ message: 'Email is required' }), {
      status: 400,
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db('form');
    const users = db.collection('users');

    const existing = await users.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ message: 'Email already exists' }), {
        status: 409,
      });
    }

    await users.insertOne({ email });

    // ✅ This response will carry the Set-Cookie header
    const res = new Response(
      JSON.stringify({ message: 'User registered successfully' }),
      { status: 201 }
    );

    const session = await getIronSession(request, res, sessionOptions);
    session.user = { email };
    await session.save();

    return res; // ✅ Return the same response session was saved on
  } catch (err) {
    console.error('Signup Error:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}
