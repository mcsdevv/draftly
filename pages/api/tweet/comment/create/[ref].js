import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify";

export default (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const comment = JSON.parse(req.body);
    const { ref } = req.query;
    try {
      // * Add comment to tweet
      const dbs = await client.query(
        q.Update(q.Ref(q.Collection("tweets"), ref), {
          data: {
            comments: q.Prepend(
              comment,
              q.Select(
                ["data", "comments"],
                q.Get(q.Ref(q.Collection("tweets"), ref))
              )
            )
          }
        })
      );
      const { data } = await dbs;
      console.log("Added comment to: ", ref);
      res.status(200).json([...data.comments]);
    } catch (e) {
      console.log("ERROR - api/tweet/comment/create -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
