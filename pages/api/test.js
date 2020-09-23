import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const tweets = await prisma.tweets.findMany({
    where: { tuid: "40f2df95-6488-4b7b-8d82-46744f548489" },
    include: {
      tweets_approvals: true,
      tweets_comments: true,
      tweets_meta: true,
    },
  });
  res.json(tweets);
  // res.send(process.env.DATABASE_URL);
}
