const sgMail = require("@sendgrid/mail");
import isOwner from "@lib/api/middleware/isOwner";
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";

const sendInvite = async (req, res) => {
  const { code, ref, team, to } = JSON.parse(req.body);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // * Compose message
  const msg = {
    to,
    from: "invites@draftly.app",
    subject: `Join the ${team} team on Draftly`,
    text: `Hello, click this button to join the ${team} team!`,
    html: `<strong>Hello, click this button to join the ${team} team! <br/> </strong><a href=${process.env.AUTH0_REDIRECT_URI}/api/team/invite/accept?team=${team}&code=${code}&ref=${ref}>Join</a>`,
  };

  // * Send message
  const sgRes = await sgMail.send(msg);
  console.log("sgRes", sgRes);
  console.log("Invite sent to:", to);
  res.status(200).end("sent");
};

export default verify(isOwner(withSentry(sendInvite)));
