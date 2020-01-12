import { client, q } from "../../../_util/fauna";
import request from "request-promise";
import verify from "../../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { handle } = req.query;
    const { ref } = JSON.parse(req.body);
    try {
      const dbs = await client.query(
        q.Delete(q.Select(["ref"], q.Get(q.Ref(q.Collection("tweets"), ref))))
      );
      const deleteOptions = {
        method: "PATCH",
        url: `${process.env.AUTH0_REDIRECT_URI}/api/team/delete/draft/${handle}`,
        body: {
          ref
        },
        headers: {
          Authorization: req.headers.authorization || req.cookies.access_token
        },
        json: true
      };
      console.log("DBS", dbs);
      await request(deleteOptions);
      console.log("Deleted tweet:", ref);
      // ok
      res.status(200).json({ ...dbs.data });
    } catch (e) {
      console.log("ERRRRRR", e);
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
