const sgMail = require("@sendgrid/mail");
import isOwner from "../../../_util/middleware/isOwner";
import verify from "../../../_util/token/verify";

const sendInvite = async (req, res) => {
  const { team, to } = req.body;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // TODO Include email, invite code, and team handle in POST
  const msg = {
    to,
    from: "mail@mcs.dev",
    subject: `Invitation to join the ${team} on Twintegrations`,
    text: "Hello, click this button to join the team!",
    html:
      "<strong>Hello, click this button to join the team!</strong><a href='https://tweet-review.now.sh'>Join</a>",
  };
  try {
    const tets = await sgMail.send(msg);
    console.log("tets", tets);
    res.status(200).end("sent");
  } catch (e) {
    console.log("errr", e);
    res.json(e);
  }
};

export default verify(isOwner(sendInvite));
