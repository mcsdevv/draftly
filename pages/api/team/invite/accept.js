// * Libraries
import prisma from "@lib/api/db/prisma";
import cookie from "cookie";

// * Middleware
import withSentry from "@lib/api/middleware/withSentry";

// * Utilities
import cookieOptions from "@lib/api/cookie/options";
import { decrypt } from "@lib/api/token/encryption";

const acceptInvite = async (req, res) => {
  const { id_token, uid } = req.cookies;
  const { code, team, tuid } = req.query;

  // * Differing action if user exists and is logged in
  if (id_token && uid) {
    // * Check code matches that of team, else error
    const inviteCode = await prisma.teams.findOne({
      where: { tuid },
      select: { inviteCode: true },
    });

    if (inviteCode !== code) {
      res.writeHead(302, {
        Location: `/errors/invite-code-invalid?team=${team}`,
      });
      res.end();
      return;
    }

    const uidDecrypted = decrypt(uid);

    // * Check the user is not currently a member of the team
    const team = await prisma.teams.findOne({
      where: { members: { some: { uid } }, tuid },
      include: {
        members: {
          include: { users: true },
        },
      },
    });

    // * Confirm the user is not a member of the team else return error
    const isMember = team.members.find((m) => m.uid === uidDecrypted);

    // * If the user is a member of the team, redirect to dashboard
    if (isMember) {
      console.log("USER IS ALREADY A MEMBER OF THIS TEAM");
      res.writeHead(302, {
        Location: `${process.env.AUTH0_REDIRECT_URI}/dashboard`,
      });
      res.end();
      return;
    }

    // * Add to team as a member
    await prisma.teams_members.create({
      data: {
        uid: uidDecrypted,
        tuid,
        role: "member",
      },
    });

    res.writeHead(302, {
      Location: `${process.env.AUTH0_REDIRECT_URI}/dashboard`,
    });
    res.end();
    // * User does not exist or is not logged in
  } else {
    console.log("NEW USER OR NOT LOGGED IN");
    res.setHeader("Set-Cookie", [
      cookie.serialize("invited_to", String(tuid), cookieOptions(false, false)),
      cookie.serialize(
        "next",
        String("/dashboard"),
        cookieOptions(false, false)
      ),
    ]);
    res.writeHead(302, {
      Location: `${process.env.AUTH0_REDIRECT_URI}/api/auth/login`,
    });
    res.end();
  }
};

export default withSentry(acceptInvite);
