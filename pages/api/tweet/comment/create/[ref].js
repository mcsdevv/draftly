import { client, q } from "../../../_util/fauna";
import {
  getDocProperty,
  getDocRef,
  getDocByRef,
} from "../../../_util/fauna/queries";
import verify from "../../../_util/token/verify";

const createTweetComment = async (req, res) => {
  try {
    const comment = JSON.parse(req.body);
    const { ref } = req.query;
    // * Add comment to tweet
    const dbs = await client.query(
      q.Update(getDocRef("tweets", ref), {
        data: {
          comments: q.Prepend(
            comment,
            getDocProperty(["data", "comments"], getDocByRef("tweets", ref))
          ),
        },
      })
    );
    const { data } = await dbs;
    console.log("Added comment to:", ref);
    res.status(200).json([...data.comments]);
  } catch (err) {
    console.error("ERROR - api/tweet/comment/create -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(createTweetComment);
