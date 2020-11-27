// * Libraries
import prisma from "@lib/api/db/prisma";

const isOwner = (handler) => async (req, res, uid, tuid) => {
  try {
    // * Get membership from members
    const membership = await prisma.members.findUnique({
      where: {
        tmuid: `${uid}_${tuid}`,
      },
    });

    // * If an owner, return handler with uid and tuid
    if (membership?.role === "owner") return handler(req, res, uid, tuid);
    // * If not a member, throw error
    else throw new Error("This action requires team membership permissions.");
  } catch (err) {
    console.error(err);
    return res.status(403).json(err);
  }
};

export default isOwner;
