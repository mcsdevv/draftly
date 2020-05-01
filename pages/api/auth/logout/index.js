import fetch from "node-fetch";
import cookie from "cookie";

export default async (req, res) => {
  await fetch(`https://${process.env.AUTH0_DOMAIN}/v2/logout`);
  const cookieOptions = (http = false) => {
    return {
      httpOnly: http,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: Date.now(),
      sameSite: true,
    };
  };
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("access_token", "", cookieOptions(true))
  );
  res.end();
};
