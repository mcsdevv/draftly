// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const updateUserName = async (req, res, uid) => {
  const { name } = JSON.parse(req.body);

  // * Update user name
  await prisma.users.update({
    where: { uid },
    data: { name },
  });

  console.log("User name updated:", uid);
  res.status(200).send(name);
};

export default verify(withSentry(updateUserName));
