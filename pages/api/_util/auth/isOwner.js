import { client, q } from "../fauna";
import jwt from "jsonwebtoken";

const isOwner = (handler) => async (req, res) => {
  const { handle } = req.query;
  try {
    const getOwners = await client.query(
      q.Select(
        ["data", "owners"],
        q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
      )
    );
    const id = jwt.decode(req.cookies.id_token);
    const isOwner = await getOwners.includes(id.email);
    if (isOwner) return handler(req, res)
  } catch (err) {
    console.log("Error authorizing: user is not an owner of the team");
    res.status(403).json({ err: "This actions require owner permissions" })
  }
};

export default isOwner