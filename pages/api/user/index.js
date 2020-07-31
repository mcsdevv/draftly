import * as Sentry from "@sentry/node";
import verify from "@lib/api/token/verify";
import { escape, query } from "@lib/api/db";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

const getUserDetails = async (req, res, uid) => {
  try {
    throw "derps";
    // * Select user from database
    const [userQuery] = await query(
      escape`SELECT * FROM users WHERE uid = ${uid}`
    );

    // * Select all teams of the user
    const teams = await query(
      escape`SELECT * FROM teams_members
      LEFT JOIN teams ON teams.tuid = teams_members.tuid
      WHERE uid = ${uid}`
    );

    // * Delete keys for all teams
    const teamsNoKeys = teams.map((t) => {
      const { token_key, token_secret, ...team } = t;
      return team;
    });

    // * Get all team members for listed teams
    const getTeamMembers = async () => {
      const members = await Promise.all(
        teamsNoKeys.map((t) => {
          return query(
            escape`SELECT * FROM teams_members
            LEFT JOIN users ON users.uid = teams_members.uid
            WHERE tuid = ${t.tuid}`
          );
        })
      );
      const membersFlat = [].concat.apply([], members);
      return membersFlat;
    };

    const teamMembers = await getTeamMembers();

    // * Add members to all teams
    const teamsWithMembers = teamsNoKeys.map((t) => {
      const members = teamMembers.filter((m) => m.tuid === t.tuid);
      return {
        ...t,
        members: members.filter((m) => m.role === "member"),
        owners: members.filter((m) => m.role === "owner"),
      };
    });

    console.log("User details:", userQuery);
    console.log("Teams details:", teamsWithMembers);
    res.status(200).json({ user: userQuery, teams: teamsWithMembers });
  } catch (err) {
    console.error("ERROR - api/user -", err.message);
    Sentry.captureException(err);
    await Sentry.flush(2000);
    throw err;
    res.status(500).json({ err: err.message });
  }
};

export default verify(getUserDetails);
