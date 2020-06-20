import isOwner from "@lib/api/middleware/isOwner";
import verify from "@lib/api/token/verify";
import { escape, query } from "@lib/api/db";

const updateReviewsRequired = async (req, res, _uid, tuid) => {
  try {
    const { reviews } = JSON.parse(req.body);

    // * Update reviews required to publish tweets
    await query(
      escape`UPDATE teams SET reviews_required = ${reviews} WHERE tuid = ${tuid}`
    );

    console.log("Team reviews required updated for:", tuid);
    res.status(200).send(reviews);
  } catch (err) {
    console.error("ERROR - api/team/update/review -", err.message);
    res.status(500).json({ error: err.message });
  }
};

export default verify(isOwner(updateReviewsRequired));
