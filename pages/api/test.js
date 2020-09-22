import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const user = await prisma.users.findOne({
    where: { uid: "065f9ef7-759b-4df8-be84-ffe2d5d9c322" },
  });
  res.json(user);
}
