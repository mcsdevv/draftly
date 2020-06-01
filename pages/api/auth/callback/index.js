import cookie from "cookie";
import jwt from "jsonwebtoken";
import { getRef } from "../../_util/getRef";
import cookieOptions from "../../_util/cookie/options";
import { encrypt } from "../../_util/token/encryption";
import { client, q } from "../../_util/fauna";
import {
  getDocByIndex,
  getDocByRef,
  getDocProperty,
  getDocRef,
} from "../../_util/fauna/queries";

import { query } from "../../_util/db";
import uuidv4 from "uuid/v4";
const escape = require("sql-template-strings");

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
        let user_id;
        let uid;
        try {
          console.log("DOES THE USER EXIST ALREADY?");
          const [existsQuery] = await query(
            escape`SELECT * FROM users WHERE email = ${id_token.email}`
          );
          const userExists = await client.query(
            getDocByIndex("all_users_by_email", id_token.email)
          );
          console.log("USER EXISTS");
          const { ref: existsRef } = await userExists;
          user_id = getRef(existsRef);
          uid = existsQuery?.uid || null;
        } catch (err) {
          console.log("errrrr", err);
        }
        // * If user does not exist, create in db
        if (!user_id) {
          const uuid = uuidv4();
          const insertQuery = await query(
            escape`INSERT INTO users (uid, name, email, picture)
            VALUES (${uuid}, ${id_token.name}, ${id_token.email}, ${id_token.picture})`
          );
          const newUser = await client.query(
            q.Create(q.Collection("users"), {
              data: {
                email: id_token.email,
                name: id_token.name,
                picture: id_token.picture,
                teams: [],
              },
            })
          );
          console.log("INSERT QUERY", insertQuery);
          const { ref: newRef } = await newUser;
          console.log("NEW USER REF", newRef);
          user_id = getRef(newRef);
          uid = uuid;
        }
        // * If handling callback from a user being invited to a team
        // TODO Add MySQL handling
        console.log("IS USER INVITED?", req.cookies.invited_to);
        if (req.cookies.invited_to) {
          console.log("IS USER MEMBER OF EXISTING TEAM?");
          const getMembers = await client.query(
            q.Union(
              getDocProperty(
                ["data", "owners"],
                getDocByRef("teams", req.cookies.invited_to)
              ),
              getDocProperty(
                ["data", "members"],
                getDocByRef("teams", req.cookies.invited_to)
              )
            )
          );
          const isMember = getMembers.includes(user_id);
          if (isMember) {
            console.log("USER IS ALREADY A MEMBER OF THIS TEAM");
          }
          if (!isMember) {
            console.log("ADDING TEAM TO USER");
            await client.query(
              q.Update(getDocRef("users", user_id), {
                data: {
                  teams: q.Append(
                    req.cookies.invited_to,
                    getDocProperty(
                      ["data", "teams"],
                      getDocByRef("users", user_id)
                    )
                  ),
                },
              })
            );
            console.log("ADDING USER TO TEAM");
            await client.query(
              q.Update(getDocRef("teams", req.cookies.invited_to), {
                data: {
                  members: q.Append(
                    user_id,
                    getDocProperty(
                      ["data", "members"],
                      getDocByRef("teams", req.cookies.invited_to)
                    )
                  ),
                },
              })
            );
          }
        }
        // * Add user_id (ref), id_token (browser), and access_token (httpOnly) as cookies
        res.setHeader("Set-Cookie", [
          cookie.serialize(
            "invited_to",
            String(""),
            cookieOptions(false, false)
          ),
          cookie.serialize(
            "user_id",
            String(user_id),
            cookieOptions(false, false)
          ),
          cookie.serialize("uid", String(uid), cookieOptions(false, false)),
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
