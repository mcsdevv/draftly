import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { metadata, text } = JSON.parse(req.body);
    const { ref } = req.query;
    try {
      const dbs = await client.query(
        q.Update(q.Ref(q.Collection("tweets"), ref), {
          data: {
            metadata,
            text
          }
        })
      );
      console.log("Updated tweet: ", ref);
      // ok
      res.status(200).json({ ...dbs.data, ref, updated: dbs.ts });
    } catch (e) {
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
