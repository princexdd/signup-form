// lib/session.js
export const sessionOptions = {
  password: process.env.SESSION_PASSWORD,
  cookieName: 'signup_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
