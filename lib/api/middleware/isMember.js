import { escape, query } from "@lib/api/db";

const isMember = (handler) => async (req, res, uid, tuid) => {
  try {
    console.time("isMember");

    // * Get all instances of user in team
    const membership = await query(
      escape`SELECT * FROM teams_members
      WHERE uid = ${uid} AND tuid = ${tuid}`
    );

    console.timeEnd("isMember");
    if (membership.length) return handler(req, res, uid, tuid);
    else throw new Error("This action requires team membership permissions");
  } catch (err) {
    console.error(err);
    return res.status(403).json(err);
  }
};

export default isMember;
