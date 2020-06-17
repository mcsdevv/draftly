import verify from "@lib/api/token/verify";
import { escape, query } from "@lib/api/db";

const createReviewTweet = async (req, res) => {
  try {
    const { twuid } = JSON.parse(req.body);

    // * Update draft to review
    await query(escape`UPDATE tweets SET type="review" WHERE twuid=${twuid}`);

    console.log("Tweet changed to review:", twuid);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/tweet/review/create -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(createReviewTweet);
