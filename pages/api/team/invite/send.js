const sgMail = require("@sendgrid/mail");
import isOwner from "@lib/api/middleware/isOwner";
import verify from "@lib/api/token/verify";

const sendInvite = async (req, res) => {
  const { code, ref, team, to } = JSON.parse(req.body);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // * Compose message
  const msg = {
    to,
    from: "mail@mcs.dev",
    subject: `Invitation to join the ${team} on Twintegrations`,
    text: `Hello, click this button to join the ${team} team!`,
    html: `<strong>Hello, click this button to join the ${team} team! <br/> </strong><a href=${process.env.AUTH0_REDIRECT_URI}/api/team/invite/accept?team=${team}&code=${code}&ref=${ref}>Join</a>`,
  };

  try {
    // * Send message
    await sgMail.send(msg);
    console.log("Invite sent to:", to);
    res.status(200).end("sent");
  } catch (err) {
    console.error("ERROR - api/team/invites/send -", err);
    res.status(500).json({ err });
  }
};

export default verify(isOwner(sendInvite));
