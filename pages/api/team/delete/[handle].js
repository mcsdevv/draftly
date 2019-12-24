import { client, q } from "../../_util/fauna";
import request from "request-promise";
import verify from "../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { handle } = req.query;
    try {
      const dbs = await client.query(
        q.Delete(
          q.Select(
            ["ref"],
            q.Get(q.Match(q.Index("all_teams_by_handle"), handle))
          )
        )
      );
      const { data, ref } = await dbs;
      const refString = ref.toString();
      const refNums = refString.match(/\d/g);
      const refJoined = refNums.join("");
      const emails = [...data.members, ...data.owners];
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
      // ok
      res.status(200).json({ ...dbs.data });
    } catch (e) {
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
