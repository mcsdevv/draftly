// * Libraries
import prisma from "@lib/api/db/prisma";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const getUserDetails = async (_req, res, uid) => {
  // * Select user with matching uid
  console.time("PROFILE");
  console.time("USER");
  const user = await prisma.users.findOne({
    where: { uid },
  });
  console.timeEnd("USER");

  console.time("TEAMS");
  // * Select teams data that will require filtering
  const teamsData = await prisma.teams.findMany({
    where: { members: { some: { uid } } },
    include: {
      members: {
        include: { user: true },
      },
    },
  });
  console.timeEnd("TEAMS");

  const teams = teamsData.map((t) => {
    // * Remove tokens that are server only
    delete t.tokenKey;
    delete t.tokenSecret;

    // * Separate members and owners
    const members = t.members.filter((m) => m.role === "member");
    const owners = t.members.filter((m) => m.role === "owner");
    return {
      ...t,
      members,
      owners,
    };
  });
  console.timeEnd("PROFILE");

  const list = [
    "89f768ac-cd37-4c74-bec7-de8537574ff6",
    "e1931b16-b3f7-4bcd-a8e5-dc8e5348f153",
  ];

  const derps = await prisma.teams.findMany({
    where: { tuid: { in: list } },
    include: {
      members: {
        include: { user: true },
      },
    },
  });

  console.log("DERPS", derps);

  console.log("Retrieved user details for:", uid);
  res.status(200).json({ user, teams });
};

export default verify(withSentry(getUserDetails));
