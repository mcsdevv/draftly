// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const deleteComment = async (req, res) => {
  const { tcuid } = JSON.parse(req.body);

  // * Delete comment
  await prisma.comments.delete({
    where: { tcuid },
  });

  console.log("Deleted comment:", tcuid);
  res.status(200).json({ tcuid });
};

export default verify(withSentry(deleteComment));
