// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");

const sendInvite = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_KEY);
  const msg = {
    to: "matthew@vercel.com",
    from: "mail@mcs.dev",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
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

export default sendInvite;
