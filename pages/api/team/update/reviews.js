import isOwner from "@lib/api/middleware/isOwner";
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import { escape, query } from "@lib/api/db";

const updateReviewsRequired = async (req, res, _uid, tuid) => {
  const { reviews } = JSON.parse(req.body);

  // * Update reviews required to publish tweets
  await query(
    escape`UPDATE teams SET reviews_required = ${reviews} WHERE tuid = ${tuid}`
  );

  console.log("Team reviews required updated for:", tuid);
  res.status(200).send(reviews);
};

export default verify(isOwner(withSentry(updateReviewsRequired)));
