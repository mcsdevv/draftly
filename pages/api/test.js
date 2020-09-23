import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  prisma.$use(async (params, next, uid, tuid) => {
    console.log(params);
    console.log("1");
    const result = await next(params);
    console.log("4");
    return result;
  });
  // const tweets = await prisma.tweets.findMany({
  //   where: { tuid: "0afb2e30-a728-436f-9b40-6d6cb47fd22b" },
  //   include: {
  //     tweets_approvals: true,
  //     tweets_comments: true,
  //     tweets_meta: true,
  //   },
  // });
  const isOwner = await prisma.teams_members.findOne({
    where: {
      uid_tuid: {
        uid: "490134e6-7231-4660-9560-5e7c1cf65186",
        tuid: "0afb2e30-a728-436f-9b40-6d6cb47fd22b",
      },
    },
  });
  console.log("OWNER", isOwner);
  res.json(tweets);
}
