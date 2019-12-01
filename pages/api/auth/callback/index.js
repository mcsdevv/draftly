import request from "request-promise";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import cookieOptions from "../../_util/cookie/options";
import { encrypt } from "../../_util/token/encryption";

module.exports = async (req, res) => {
  //  confirm state match to mitigate CSRF
  if (req.query.state === req.cookies.state) {
    // prepare options for token exchange
    const authOptions = {
      method: "POST",
      url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      form: {
        grant_type: "authorization_code",
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: req.query.code,
        redirect_uri: `${process.env.AUTH0_REDIRECT_URI}/api/auth/callback/`
      },
      json: true
    };
    // send request for token exchange
    const auth = await request(authOptions);
    // check no error on token exchange
    if (!auth.error) {
      res.setHeader("Location", `/${req.cookies.next}`);
      const id_token = jwt.decode(auth.id_token);
      // encrypt access token
      const access_token = encrypt(auth.access_token);
      //  confirm nonce match to mitigate token replay attack
      if (req.cookies.nonce === id_token.nonce) {
        const existsOptions = {
          method: "GET",
          url: `${process.env.AUTH0_REDIRECT_URI}/api/user/exists/${id_token.email}`,
          headers: {
            Authorization: access_token
          },
          json: true
        };
        const exists = await request(existsOptions);
        // if user does not exist, create in db
        console.log("HEADERS", req.cookies);
        if (!exists) {
          const createOptions = {
            method: "POST",
            url: `${process.env.AUTH0_REDIRECT_URI}/api/user/create`,
            body: {
              email: id_token.email,
              name: id_token.name,
              picture: id_token.picture
            },
            headers: {
              Authorization: access_token
            },
            json: true
          };
          await request(createOptions);
        }
        // add id_token (browser) + access_token (httpOnly) as cookies
        res.setHeader("Set-Cookie", [
          cookie.serialize(
            "id_token",
            String(auth.id_token),
            cookieOptions(false, false)
          ),
          cookie.serialize(
            "access_token",
            String(access_token),
            cookieOptions(true, false)
          )
        ]);
        // send response
        res.status(302).end();
      } else {
        // advise token replay attack possible if nonce's do not match
        res.send("Nonce mismatch, potential token replay attack underway.");
      }
    }
  } else {
    // advise CSRF attack likely if states do not match
    res.send("State mismatch, CSRF attack likely.");
  }
};
