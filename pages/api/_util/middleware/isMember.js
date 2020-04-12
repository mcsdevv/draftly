import { client, q } from "../fauna";
import jwt from "jsonwebtoken";

const isMember = (handler) => async (req, res) => {
  try {
    console.time("isMember");
    const { handle } = req.query;
    const getMembers = await client.query(
      q.Union(
        q.Select(
          ["data", "owners"],
          q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
        ),
        q.Select(
          ["data", "members"],
          q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
        )
      )
    );
    const id = jwt.decode(req.cookies.id_token);
    const isMember = await getMembers.includes(id.email);
    console.timeEnd("isMember");
    if (isMember) return handler(req, res);
    else throw "This action requires team membership permissions";
  } catch (err) {
    console.error("Error authorizing: user is not a member of the team");
    return res.status(403).json({ err: err.message });
  }
};

export default isMember;
