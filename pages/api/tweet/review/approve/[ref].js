import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { email } = JSON.parse(req.body);
    const { ref } = req.query;
    console.log(email, ref);
    try {
      const dbs = await client.query(
        q.Update(q.Ref(q.Collection("tweets"), ref), {
          data: {
            approvedBy: q.Append(
              email,
              q.Select(
                ["data", "approvedBy"],
                q.Get(q.Ref(q.Collection("tweets"), ref))
              )
            )
          }
        })
      );
      console.log("Approved tweet: ", ref);
      res.status(200).json({ ...dbs.data, ref, updated: dbs.ts });
    } catch (e) {
      console.log("ERROR - api/tweet/review/approve -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
