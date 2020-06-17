import cookie from "cookie";
import cookieOptions from "@lib/api/cookie/options";
import { escape, query } from "@lib/api/db";
import createInviteCode from "@lib/api/createInviteCode";

const acceptInvite = async (req, res) => {
  const { id_token, uid } = req.cookies;
  const { code, ref, team } = req.query;

  // * Differing action if user exists and is logged in
  if (id_token && uid) {
    console.log("CHECKING IF USER IS AN EXISTING MEMBER OF THE TEAM");
    try {
      // TODO Check code matches that of team, else error

      // * Check the user is not currently a member of the team
      const membersQuery = await query(
        escape`SELECT * FROM teams_members
        LEFT JOIN users ON users.uid = teams_members.uid
        WHERE tuid = ${team}`
      );

      // * Confirm the user is not a member of the team else return error
      const isMember = membersQuery.includes(uid);
      if (isMember) {
        console.log("USER IS ALREADY A MEMBER OF THIS TEAM");
        res.writeHead(302, {
          Location: `${process.env.AUTH0_REDIRECT_URI}/dashboard`,
        });
        res.end();
        return;
      }

      // * Add to team as a member
      await query(
        escape`INSERT INTO team_members (uid, tuid, role)
        VALUES (${uid}, ${team}, 'member')`
      );

      // * Update invite code name
      const inviteCode = createInviteCode();
      await query(
        escape`UPDATE teams SET invite_code = ${inviteCode} WHERE tuid = ${team}`
      );

      res.writeHead(302, {
        Location: `${process.env.AUTH0_REDIRECT_URI}/dashboard`,
      });
      res.end();
    } catch (err) {
      console.error("ERROR - api/team/invite/accept -", err.message);
      res.status(500).json({ err: err.message });
    }
    // * User does not exist or is not logged in
  } else {
    console.log("NEW USER OR NOT LOGGED IN");
    try {
      res.setHeader("Set-Cookie", [
        cookie.serialize(
          "invited_to",
          String(ref),
          cookieOptions(false, false)
        ),
        cookie.serialize(
          "next",
          String("/dashboard"),
          cookieOptions(false, false)
        ),
      ]);
      res.writeHead(302, {
        Location: `${process.env.AUTH0_REDIRECT_URI}/api/auth/login`,
      });
      res.end();
    } catch (err) {
      console.error("ERROR - api/team/invite/accept -", err.message);
      res.status(500).json({ err: err.message });
    }
  }
};

export default acceptInvite;
