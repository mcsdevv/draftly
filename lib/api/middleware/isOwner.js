import { escape, query } from "../db";

const isOwner = (handler) => async (req, res, uid, tuid) => {
  try {
    console.time("isOwner");

    console.log(uid, tuid);

    // * Get all instances of user in team
    const ownership = await query(
      escape`SELECT * FROM teams_members
      WHERE uid = ${uid} AND tuid = ${tuid} AND role = 'owner'`
    );

    console.timeEnd("isOwner");
    if (ownership.length) return handler(req, res);
    else throw "This action requires team membership permissions";
  } catch (err) {
    console.error("Error authorizing: user is not an owner of the team");
    return res.status(403).json({ err: err.message });
  }
};

export default isOwner;
