import cookie from "cookie";

export default async (req, res) => {
  // * Log user out of Auth0 sessions
  const logout = await fetch(`https://${process.env.AUTH0_DOMAIN}/v2/logout`);

  // TODO Move to lib
  const cookieOptions = (http = false) => {
    return {
      httpOnly: http,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: Date.now(),
      sameSite: true,
    };
  };

  // * Remove access token by voiding the cookie
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("access_token", "", cookieOptions(true))
  );
  res.end();
};
