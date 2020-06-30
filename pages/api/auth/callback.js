import cookie from "cookie";
import jwt from "jsonwebtoken";
import cookieOptions from "@lib/api/cookie/options";
import uuidv4 from "uuid/v4";
import { encrypt } from "@lib/api/token/encryption";
import { escape, query } from "@lib/api/db";

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
      const id_token = jwt.decode(auth.id_token);

      // * Encrypt access token
      const access_token = encrypt(auth.access_token);

      // * Confirm nonce match to mitigate token replay attack
      if (req.cookies.nonce === id_token.nonce) {
        let uid;
        console.log("DOES THE USER EXIST ALREADY?");
        const [existsQuery] = await query(
          escape`SELECT * FROM users WHERE email = ${id_token.email}`
        );
        uid = existsQuery?.uid || null;

        // * If user does not exist, create in db
        if (!uid) {
          uid = uuidv4();
          await query(
            escape`INSERT INTO users (uid, name, email, picture)
            VALUES (${uid}, ${id_token.name}, ${id_token.email}, ${id_token.picture})`
          );
        }

        // * If handling callback from a user being invited to a team
        if (req.cookies.invited_to) {
          const { invited_to, uid } = req.cookies;
          const membersQuery = await query(
            escape`SELECT * FROM teams_members
            LEFT JOIN users ON users.uid = teams_members.uid
            WHERE tuid = ${invited_to}`
          );
          const isMember = membersQuery.includes(user_id);
          if (isMember) {
            console.log("USER IS ALREADY A MEMBER OF THIS TEAM");
          }
          if (!isMember) {
            // * Insert team member
            await query(
              escape`INSERT INTO team_members (uid, tuid, role)
              VALUES (${uid}, ${invited_to}, 'member')`
            );
          }
        }

        // * Add uid, id_token, and access_token (httpOnly) as cookies
        res.setHeader("Set-Cookie", [
          cookie.serialize(
            "invited_to",
            String(""),
            cookieOptions(false, false)
          ),
          cookie.serialize(
            "uid",
            String(encrypt(uid || "")),
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

        // * Set redirect location and fallback to dashboard
        res.setHeader("Location", `${req.cookies.next || "/dashboard"}`);

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
