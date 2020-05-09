const sgMail = require("@sendgrid/mail");
import isOwner from "../../../_util/middleware/isOwner";
import verify from "../../../_util/token/verify";

const sendInvite = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_KEY);
  // TODO Include email, invite code, and team handle in POST
  const msg = {
    to: "matthew@vercel.com",
    from: "mail@mcs.dev",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
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
