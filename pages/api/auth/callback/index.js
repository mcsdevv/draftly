import cookie from "cookie";
import jwt from "jsonwebtoken";
import { getRef } from "../../_util/getRef";
import cookieOptions from "../../_util/cookie/options";
import { encrypt } from "../../_util/token/encryption";

export default async (req, res) => {
  // * Confirm state match to mitigate CSRF
  if (req.query.state === req.cookies.state) {
    // * Send request for token exchange
    const authRes = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          code: req.query.code,
          redirect_uri: `${process.env.AUTH0_REDIRECT_URI}/api/auth/callback/`,
        }),
      }
    );
    const auth = await authRes.json();
    // * Check no error on token exchange
    if (!auth.error) {
      res.setHeader("Location", `${req.cookies.next}`);
      const id_token = jwt.decode(auth.id_token);
      // * Encrypt access token
      const access_token = encrypt(auth.access_token);
      // * Confirm nonce match to mitigate token replay attack
      if (req.cookies.nonce === id_token.nonce) {
        const exists = await fetch(
          `${process.env.AUTH0_REDIRECT_URI}/api/user/exists/${id_token.email}`,
          {
            headers: {
              Authorization: access_token,
            },
          }
        );
        let user_id;
        const { ref: existsRef } = await exists.json();
        user_id = existsRef;
        // * If user does not exist, create in db
        if (!existsRef) {
          const user = await fetch(
            `${process.env.AUTH0_REDIRECT_URI}/api/user/create`,
            {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                email: id_token.email,
                name: id_token.name,
                picture: id_token.picture,
              }),
              headers: {
                Authorization: access_token,
              },
            }
          );
          const { ref: newRef } = await user.json();
          console.log("ref", newRef);
          user_id = getRef(newRef);
        }
        // * Add user_id (ref), id_token (browser), and access_token (httpOnly) as cookies
        res.setHeader("Set-Cookie", [
          cookie.serialize(
            "user_id",
            String(user_id),
            cookieOptions(false, false)
          ),
          cookie.serialize(
            "id_token",
            String(auth.id_token),
            cookieOptions(false, false)
          ),
          cookie.serialize(
            "access_token",
            String(access_token),
            cookieOptions(true, false)
          ),
        ]);
        // * Send response using redirect code
        res.status(302).end();
      } else {
        // * Advise token replay attack possible if nonce's do not match
        res.send("Nonce mismatch, potential token replay attack underway.");
      }
    }
  } else {
    // * Advise CSRF attack likely if states do not match
    res.send("State mismatch, CSRF attack likely.");
  }
};
