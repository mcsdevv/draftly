module.exports = (httpOnly = false, sameSite = false) => {
  return {
    httpOnly,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    sameSite
  };
};
