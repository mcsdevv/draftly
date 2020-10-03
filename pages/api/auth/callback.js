// * Libraries
import prisma from "@lib/api/db/prisma";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import cookieOptions from "@lib/api/cookie/options";
import { v4 as uuidv4 } from "uuid";

// * Middleware
import withSentry from "@lib/api/middleware/withSentry";

// * Utilities
import { encrypt } from "@lib/api/token/encryption";
import { getRedirectUrl } from "@lib/api/getRedirectUrl";

const authCallback = async (req, res) => {
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
          redirect_uri: `${getRedirectUrl(req)}/api/auth/callback/`,
        }),
      }
    );
    const auth = await authRes.json();

    // * Throw error if provided by Auth0
    if (auth.error) {
      throw new Error(auth.error_description);
    }

    // * Check no error on token exchange
    if (!auth.error) {
      const id_token = jwt.decode(auth.id_token);

      // * Encrypt access token
      const access_token = encrypt(auth.access_token);

      // * Confirm nonce match to mitigate token replay attack
      if (req.cookies.nonce === id_token.nonce) {
        let uid;

        // * Check if this is an existing user
        const user = await prisma.users.findOne({
          where: { email: id_token.email },
        });

        // * If user exists, set uid
        uid = user?.uid || null;

        // * If user does not exist, insert into database
        if (!uid) {
          uid = uuidv4();
          await prisma.users.create({
            data: {
              uid,
              email: id_token.email,
              name: id_token.name,
              picture: id_token.picture,
            },
          });
        }

        // * If handling callback from a user being invited to a team
        if (req.cookies.invited_to) {
          const { invited_to } = req.cookies;

          // * Get the team associated with invite
          const team = await prisma.teams.findOne({
            where: { tuid: invited_to },
            include: {
              members: true,
            },
          });

          // * Check whether user is a member of the team already
          const isMember = team?.members.find((m) => m.uid === uid);

          // * If user is not a member of the team, add them to the team
          if (!isMember) {
            await prisma.teams_members.create({
              data: {
                uid,
                tuid: invited_to,
                role: "member",
              },
            });
          }
        }

        // * Add uid, id_token, and access_token (httpOnly) as cookies and reset invited_to
        res.setHeader("Set-Cookie", [
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
          cookie.serialize(
            "invited_to",
            String(""),
            cookieOptions(false, false)
          ),
        ]);

        // TODO Check if the user is a member of a team and add handle to the path

        // * Set redirect location and fallback to dashboard
        res.setHeader("Location", `${req.cookies.next || "/dashboard"}`);

        // * Send response using redirect code
        res.status(302).end();
      } else {
        // * Advise token replay attack possible if nonce's do not match
        console.log("Nonce mismatch, potential token replay attack underway.");

        // * Redirect to relevant error page
        res.writeHead(302, { Location: "/errors/login-failure" });
        res.end();
      }
    }
  } else {
    // * Advise CSRF attack likely if states do not match
    console.log("State mismatch, CSRF attack likely.");

    // * Redirect to relevant error page
    res.writeHead(302, { Location: "/errors/login-failure" });
    res.end();
  }
};

export default withSentry(authCallback);
