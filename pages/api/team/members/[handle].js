import { client, q } from "../../_util/fauna";
import { getDocProperty, getDocByRef } from "../../_util/fauna/queries";
import verify from "../../_util/token/verify";
import isMember from "../../_util/middleware/isMember";
import { getRef } from "../../_util/getRef";

const getTeamMembers = async (req, res) => {
  // * Create hook to handle fetching
  // * Get list of team members & owners from body
  // * Map over list to extract details and return array (see user/details)
  try {
    console.time("getTeamMembers");
    const { handle, ref } = req.query;
    console.log("REF", ref);
    // * Update team name
    const dbs = await client.query(
      q.Union(
        q.Map(
          getDocProperty(["data", "members"], getDocByRef("teams", ref)),
          q.Lambda("x", q.Get(q.Ref(q.Collection("users"), q.Var("x"))))
        ),
        q.Map(
          getDocProperty(["data", "owners"], getDocByRef("teams", ref)),
          q.Lambda("x", q.Get(q.Ref(q.Collection("users"), q.Var("x"))))
        )
      )
    );
    console.log("DBS", dbs);
    const membersFormatted = dbs.map((m) => {
      return { ref: getRef(m.ref), ...m.data };
    });
    console.timeEnd("getTeamMembers");
    console.log("Got team members for:", handle);
    res.status(200).json(membersFormatted);
  } catch (err) {
    console.error("ERROR - api/team/members -", err);
    res.status(500).json({ err: err.message });
  }
};

export default verify(isMember(getTeamMembers));
