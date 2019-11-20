const request = require("request-promise");
const cookie = require("cookie");
const cookieOptions = require("../../_util/cookie/options");
const jwt = require("jsonwebtoken");
const { client, q } = require("../../_util/fauna");

module.exports = async (req, res) => {
  //  confirm state match to mitigate CSRF
  if (req.query.state === req.cookies.state) {
    // prepare options for token exchange
    const options = {
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
    const auth = await request(options);
    // check no error on token exchange
    if (!auth.error) {
      res.setHeader("Location", "/");
      //  confirm nonce match to mitigate token replay attack
      if (req.cookies.nonce === jwt.decode(auth.id_token).nonce) {
        // encrypt access token
        // TODO: Store email, name, picture in database
        client
          .query(
            q.Get(q.Match(q.Index("all_users_by_email"), "matthew@zeit.co"))
          )
          .then(ret => console.log("ret", ret));
        // add id_token (browser) as cookie
        res.setHeader("Set-Cookie", [
          cookie.serialize(
            "id_token",
            String(auth.id_token),
            cookieOptions(false, true)
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
