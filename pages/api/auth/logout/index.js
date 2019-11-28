const request = require("request-promise");
const cookie = require("cookie");

export default async (req, res) => {
  const options = {
    method: "GET",
    url: `https://${process.env.AUTH0_DOMAIN}/v2/logout`
  };
  await request(options);
  const cookieOptions = (http = false) => {
    return {
      httpOnly: http,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: Date.now(),
      sameSite: true
    };
  };
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("access_token", "", cookieOptions(true))
  );
  res.end();
};
