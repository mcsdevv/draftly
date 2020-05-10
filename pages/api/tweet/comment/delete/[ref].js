import { client, q } from "../../../_util/fauna";
import {
  getDocProperty,
  getDocRef,
  getDocByRef,
} from "../../../_util/fauna/queries";
import verify from "../../../_util/token/verify";

const deleteTweetComment = async (req, res) => {
  const { id } = JSON.parse(req.body);
  const { ref } = req.query;
  try {
    // * Delete a tweet comment
    const dbs = await client.query(
      q.Update(getDocRef("tweets", ref), {
        data: {
          comments: q.Filter(
            getDocProperty(["data", "comments"], getDocByRef("tweets", ref)),
            q.Lambda("i", q.Not(q.Equals(id, q.Select(["id"], q.Var("i")))))
          ),
        },
      })
    );
    const { data } = await dbs;
    console.log("Deleted comment for:", ref);
    res.status(200).json([...data.comments]);
  } catch (err) {
    console.error("ERROR - api/tweet/comment/delete -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(deleteTweetComment);
