import { client, q } from "../fauna";
import jwt from "jsonwebtoken";

const isOwner = handler => async (req, res) => {
  try {
    const { handle } = req.query;
    const getOwners = await client.query(
      q.Select(
        ["data", "owners"],
        q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
      )
    );
    const id = jwt.decode(req.cookies.id_token);
    const isOwner = await getOwners.includes(id.email);
    if (isOwner) return handler(req, res);
    else throw "This action requires owner permissions";
  } catch (err) {
    console.error("Error authorizing: user is not an owner of the team");
    return res.status(403).json({ err: err.message });
  }
};

export default isOwner;
