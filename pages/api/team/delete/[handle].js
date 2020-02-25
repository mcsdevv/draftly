import { client, q } from "../../_util/fauna";
import { getRef } from "../../_util/getRef";
import request from "request-promise";
import verify from "../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { handle } = req.query;
    try {
      // * Delete a team
      const dbs = await client.query(
        q.Delete(
          q.Select(
            ["ref"],
            q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
          )
        )
      );
      const { data, ref } = await dbs;
      const refJoined = getRef(ref);
      const emails = [...data.members, ...data.owners];
      // * Remove team from all users
      const deleteOptions = {
        method: "PATCH",
        url: `${process.env.AUTH0_REDIRECT_URI}/api/users/delete/team/${refJoined}`,
        body: {
          emails
        },
        headers: {
          Authorization: req.headers.authorization || req.cookies.access_token
        },
        json: true
      };
      await request(deleteOptions);
      console.log("Deleted team:", dbs.data.name);
      res.status(200).json({ ...dbs.data });
    } catch (e) {
      console.log("ERROR - api/team/delete -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
