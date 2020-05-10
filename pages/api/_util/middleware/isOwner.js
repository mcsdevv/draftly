import { client } from "../fauna";
import { getDocProperty, getDocByIndex } from "../fauna/queries";

const isOwner = (handler) => async (req, res) => {
  try {
    console.time("isOwner");
    const handle = req.query.handle || req.body.handle;
    const getOwners = await client.query(
      getDocProperty(
        ["data", "owners"],
        getDocByIndex("all_teams_by_handle", handle)
      )
    );
    const isOwner = getOwners.includes(req.cookies.user_id);
    console.timeEnd("isOwner");
    if (isOwner) return handler(req, res);
    else throw "This action requires owner permissions";
  } catch (err) {
    console.error("Error authorizing: user is not an owner of the team");
    return res.status(403).json({ err: err.message });
  }
};

export default isOwner;
