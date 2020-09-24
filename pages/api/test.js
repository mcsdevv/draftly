import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getTweets = async (req, res, uid, tuid) => {
  const tweets = await prisma.tweets.findMany({
    where: { tuid },
    include: {
      tweets_approvals: true,
      tweets_comments: true,
      tweets_meta: true,
    },
  });

  res.json(tweets);
};

export default getTweets;

// const isOwner = await prisma.teams_members.findOne({
//   where: {
//     uid_tuid: {
//       uid: "490134e6-7231-4660-9560-5e7c1cf65186",
//       tuid: "0afb2e30-a728-436f-9b40-6d6cb47fd22b",
//     },
//   },
// });
