// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const updateUserPicture = async (req, res, uid) => {
  const { picture } = JSON.parse(req.body);

  // * Update user picture
  await prisma.users.update({
    where: { uid },
    data: { picture },
  });

  console.log("User picture updated:", uid);
  res.status(200).send(picture);
};

export default verify(withSentry(updateUserPicture));
