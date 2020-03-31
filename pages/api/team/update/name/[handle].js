import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify-new";
import jwt from "jsonwebtoken";

const updateTeamName = async (req, res, err) => {
  console.log('hi')
  if (err) res.status(400).json({ err });
  const { newName } = JSON.parse(req.body);
  const { handle } = req.query;
  // ! POC for Authorization
  try {
    // * Update team name

    const getOwners = await client.query(
      q.Select(
        ["data", "owners"],
        q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
      )
    );
    console.log("ownerrrrs", getOwners);
    const id = jwt.decode(req.cookies.id_token);
    const isOwner = await getOwners.includes(id.email);
    console.log("isownerrrrs", isOwner);
    const dbs = await client.query(
      q.Update(
        q.Select(
          ["ref"],
          q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
        ),
        {
          data: {
            name: newName
          }
        }
      )
    );
    console.log("Team name updated for:", handle);
    res.status(200).json(dbs.data);
  } catch (e) {
    console.log("ERROR - api/team/update/name -", e.message);
    res.status(500).json({ error: e.message });
  }
};

export default verify(updateTeamName);