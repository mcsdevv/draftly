// * Libraries
import prisma from "@lib/api/db/prisma";
import { v4 as uuidv4 } from "uuid";
const sgMail = require("@sendgrid/mail");

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const createApprovalRequest = async (req, res) => {
  const { campaign, email, name, team, twuid, uid } = JSON.parse(req.body);

  const tauid = uuidv4();

  // * Create request
  const approvalRequested = await prisma.approvals.create({
    data: {
      tauid,
      uid,
      state: "requested",
      tweet: { connect: { twuid } },
    },
    select: {
      tweet: {
        include: {
          approvals: true,
          comments: { include: { addedBy: true } },
          creator: true,
          metadata: true,
        },
      },
    },
  });

  // * Initialize SendGrid
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // * Compose message
  const msg = {
    to: email,
    from: "approvals@draftly.app",
    subject: `Draftly - Approval requested for the ${campaign} tweet on the ${team} team`,
    text: `Hello ${name}, click this button to view the ${campaign} tweet.`,
    html: `<strong>Hello ${name}, click this button to view the ${campaign} tweet. <br/> </strong><a href=${process.env.AUTH0_REDIRECT_URI}/${team}/tweets/drafts/${twuid}>View</a>`,
  };

  // * Send message
  try {
    await sgMail.send(msg);

    console.log("Approval requested from:", uid);
    res.status(200).json(approvalRequested);
  } catch (err) {
    console.log(err);
    res.status(502).json(err);
  }
};

export default verify(withSentry(createApprovalRequest));
