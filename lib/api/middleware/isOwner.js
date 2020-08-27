import { escape, query } from "../db";

const isOwner = (handler) => async (req, res, uid, tuid) => {
  try {
    console.time("isOwner");

    // * Get all instances of user in team
    const ownership = await query(
      escape`SELECT * FROM teams_members
      WHERE uid = ${uid} AND tuid = ${tuid} AND role = 'owner'`
    );

    console.timeEnd("isOwner");
    if (ownership.length) return handler(req, res, uid, tuid);
    else throw new Error("This action requires team membership permissions");
  } catch (err) {
    console.error(err);
    return res.status(403).json(err);
  }
};

export default isOwner;
