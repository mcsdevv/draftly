import cookie from "cookie";
import cookieOptions from "@lib/api/cookie/options";
import { escape, query } from "@lib/api/db";
import createInviteCode from "@lib/api/createInviteCode";
import withSentry from "@lib/api/middleware/withSentry";

const acceptInvite = async (req, res, uid) => {
  const { id_token } = req.cookies;
  const { code, team, tuid } = req.query;

  // * Differing action if user exists and is logged in
  if (id_token && uid) {
    console.log("CHECKING IF USER IS AN EXISTING MEMBER OF THE TEAM");
    // TODO Check code matches that of team, else error

    // * Check the user is not currently a member of the team
    const membersQuery = await query(
      escape`SELECT * FROM teams_members
        LEFT JOIN users ON users.uid = teams_members.uid
        WHERE tuid = ${tuid}`
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
    const insert = await query(
      escape`INSERT INTO teams_members (uid, tuid, role)
        VALUES (${uid}, ${team}, 'member')`
    );
    console.log("INSERT", insert);

    // * Update invite code name
    const inviteCode = createInviteCode();
    await query(
      escape`UPDATE teams SET invite_code = ${inviteCode} WHERE tuid = ${team}`
    );

    res.writeHead(302, {
      Location: `${process.env.AUTH0_REDIRECT_URI}/dashboard`,
    });
    res.end();
    // * User does not exist or is not logged in
  } else {
    console.log("NEW USER OR NOT LOGGED IN");
    res.setHeader("Set-Cookie", [
      cookie.serialize("invited_to", String(tuid), cookieOptions(false, false)),
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
  }
};

export default withSentry(acceptInvite);
