import { client, q } from "../../../_util/fauna";
import verify from "../../../_util/token/verify-new";

const createTweetComment = async (req, res) => {
  try {
    const comment = JSON.parse(req.body);
    const { ref } = req.query;
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
  } catch (err) {
    console.error("ERROR - api/tweet/comment/create -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(createTweetComment);
