import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const tweets = await prisma.tweets.findMany({
    where: { tuid: "0afb2e30-a728-436f-9b40-6d6cb47fd22b" },
    include: {
      tweets_approvals: true,
      tweets_comments: true,
      tweets_meta: true,
    },
  });
  res.json(tweets);
  // res.send(process.env.DATABASE_URL);
}
