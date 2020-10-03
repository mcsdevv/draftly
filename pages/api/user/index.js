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
        include: { users: true },
      },
    },
  });
  console.timeEnd("TEAMS");

  // const teamsData2 = await prisma.teams.findMany({
  //   where: {
  //     members: [],
  //   },
  //   include: { members: true },
  // });
  // console.log("wetwsf", teamsData2);

  const teams = teamsData.map((t) => {
    // * Remove tokens that are server only
    delete t.token_key;
    delete t.token_secret;

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

  console.log("Retrieved user details for:", uid);
  res.status(200).json({ user, teams });
};

export default verify(withSentry(getUserDetails));
