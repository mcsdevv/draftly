import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";

const getUserDetails = async (_req, res, uid) => {
  // * Select user, teams part of, and team members
  const data = await query(
    escape`SELECT * FROM users WHERE uid = ${uid};

    SELECT * FROM teams t
    LEFT JOIN teams_members tm ON t.tuid = tm.tuid
    WHERE uid = ${uid};

    SELECT * FROM users u
    LEFT JOIN teams_members tm ON u.uid = tm.uid
    WHERE tm.tuid in(
      SELECT t.tuid 
      FROM teams t
      LEFT JOIN teams_members tm ON t.tuid = tm.tuid
      WHERE uid = ${uid}
    );`
  );

  const allData = () => {
    const user = { ...data[0] };

    const teams = data[1].map((t) => {
      // TODO Request less from database
      delete t.role;
      delete t.token_key;
      delete t.token_secret;
      delete t.uid;
      return {
        ...t,
        members: data[2].filter(
          (m) => m.role === "member" && m.tuid === t.tuid
        ),
        owners: data[2].filter((m) => m.role === "owner" && m.tuid === t.tuid),
      };
    });
    return { user, teams };
  };

  console.log("Retrieved user details for:", uid);
  res.status(200).json({ ...allData() });
};

export default verify(withSentry(getUserDetails));
