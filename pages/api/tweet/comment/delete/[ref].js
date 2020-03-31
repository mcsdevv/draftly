import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify-new";

const deleteTweetComment = async (req, res) => {
  const { id } = JSON.parse(req.body);
  const { ref } = req.query;
  try {
    // * Delete a tweet comment
    const dbs = await client.query(
      q.Update(q.Ref(q.Collection("tweets"), ref), {
        data: {
          comments: q.Filter(
            q.Select(
              ["data", "comments"],
              q.Get(q.Ref(q.Collection("tweets"), ref))
            ),
            q.Lambda("i", q.Not(q.Equals(id, q.Select(["id"], q.Var("i")))))
          )
        }
      })
    );
    const { data } = await dbs;
    console.log("Deleted comment for:", ref);
    res.status(200).json([...data.comments]);
  } catch (err) {
    console.log("ERROR - api/tweet/comment/delete -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(deleteTweetComment);
