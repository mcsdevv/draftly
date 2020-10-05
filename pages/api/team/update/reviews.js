// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import isOwner from "@lib/api/middleware/isOwner";
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const updateReviewsRequired = async (req, res, _uid, tuid) => {
  const { reviews } = JSON.parse(req.body);

  // * Update reviews required to publish tweets
  await prisma.teams.update({
    where: { tuid },
    data: { reviewsRequired: reviews },
  });

  console.log("Team reviews required updated for:", tuid);
  res.status(200).send(reviews);
};

export default verify(isOwner(withSentry(updateReviewsRequired)));
