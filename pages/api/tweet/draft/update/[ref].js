import { client, q } from "../../../_util/fauna";
import { getDocRef } from "../../../_util/fauna/queries";
import verify from "../../../_util/token/verify";

const updateDraftTweet = async (req, res) => {
  try {
    const { metadata, text } = JSON.parse(req.body);
    const { ref } = req.query;
    // * Update a draft tweet
    const dbs = await client.query(
      q.Update(getDocRef("tweets", ref), {
        data: {
          metadata,
          text,
        },
      })
    );
    console.log("Updated tweet: ", ref);
    res.status(200).json({ ...dbs.data, ref, updated: dbs.ts });
  } catch (err) {
    console.error("ERROR - api/tweet/draft/update -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(updateDraftTweet);
