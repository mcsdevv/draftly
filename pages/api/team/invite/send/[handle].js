const sgMail = require("@sendgrid/mail");
import isOwner from "../../../_util/middleware/isOwner";
import verify from "../../../_util/token/verify";

const sendInvite = async (req, res) => {
  const { code, team, to } = JSON.parse(req.body);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to,
    from: "mail@mcs.dev",
    subject: `Invitation to join the ${team} on Twintegrations`,
    text: `Hello, click this button to join the ${team} team!`,
    html: `<strong>Hello, click this button to join the ${team} team!</strong><a href=https://tweet-review.now.sh/invite/join?team=${team}&code=${code}>Join</a>`,
  };
  try {
    await sgMail.send(msg);
    console.log("Invite sent to:", to);
    res.status(200).end("sent");
  } catch (err) {
    console.error("ERROR - api/team/exists -", err);
    res.status(500).json({ err });
  }
};

export default verify(isOwner(sendInvite));
