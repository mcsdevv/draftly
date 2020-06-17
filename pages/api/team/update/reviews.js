import isOwner from "@lib/api/middleware/isOwner";
import verify from "../../_util/token/verify";
import { escape, query } from "@lib/api/db";

const updateReviewsRequired = async (req, res) => {
  try {
    const { reviews, tuid } = JSON.parse(req.body);

    // * Update reviews required to publish tweets
    await query(
      escape`UPDATE teams SET reviews_required = ${reviews} WHERE tuid = ${tuid}`
    );

    console.log("Team reviews required updated for:", tuid);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/team/update/review -", err.message);
    res.status(500).json({ error: err.message });
  }
};

export default verify(isOwner(updateReviewsRequired));
