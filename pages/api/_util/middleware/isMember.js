import { client, q } from "../fauna";
import { getDocByIndex } from "../fauna/queries";

const isMember = (handler) => async (req, res) => {
  console.log(req.cookies);
  try {
    console.time("isMember");
    const handle = req.query.handle || req.body.handle;
    const getMembers = await client.query(
      q.Union(
        q.Select(
          ["data", "owners"],
          getDocByIndex("all_teams_by_handle", handle)
        ),
        q.Select(
          ["data", "members"],
          getDocByIndex("all_teams_by_handle", handle)
        )
      )
    );
    const isMember = getMembers.includes(req.cookies.user_id);
    console.timeEnd("isMember");
    if (isMember) return handler(req, res);
    else throw "This action requires team membership permissions";
  } catch (err) {
    console.error("Error authorizing: user is not a member of the team");
    return res.status(403).json({ err: err.message });
  }
};

export default isMember;
