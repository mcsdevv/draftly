import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  console.log("pw", process.env.MYSQL_PASSWORD);
  console.log("user", process.env.MYSQL_USER);
  console.log("db", process.env.MYSQL_DATABASE);
  console.log("host", process.env.MYSQL_HOST);
  const tweets = await prisma.tweets.findMany({
    where: { tuid: "0afb2e30-a728-436f-9b40-6d6cb47fd22b" },
    include: {
      tweets_approvals: true,
      tweets_comments: true,
      tweets_meta: true,
    },
  });
  res.json(tweets, {
    pw: process.env.MYSQL_PASSWORD,
    username: process.env.MYSQL_USER,
    db: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
  });
}
