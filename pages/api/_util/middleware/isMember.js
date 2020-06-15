import { escape, query } from "../db";

const isMember = (handler) => async (req, res, uid) => {
  try {
    console.time("isMember");

    // * Get all instances of user in team
    const membership = await query(
      escape`SELECT * FROM teams_members
      WHERE uid = ${uid} AND tuid = ${req.cookies.tuid}`
    );

    console.timeEnd("isMember");
    if (membership.length) return handler(req, res);
    else throw "This action requires team membership permissions";
  } catch (err) {
    console.error("Error authorizing: user is not a member of the team");
    return res.status(403).json({ err: err.message });
  }
};

export default isMember;
