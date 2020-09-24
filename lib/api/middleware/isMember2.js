import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const isMember = (handler) => async (req, res, uid, tuid) => {
  try {
    // * Get membership from teams_members
    const membership = await prisma.teams_members.findOne({
      where: {
        uid_tuid: {
          uid: "490134e6-7231-4660-9560-5e7c1cf65186",
          tuid: "0afb2e30-a728-436f-9b40-6d6cb47fd22b",
        },
      },
    });

    // * If a member, return handler with uid and tuid
    if (!!membership) return handler(req, res, uid, tuid);
    // * If not a member, throw error
    else throw new Error("This action requires team membership permissions.");
  } catch (err) {
    console.error(err);
    return res.status(403).json(err);
  }
};

export default isMember;
