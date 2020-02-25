const Twitter = require("twitter");
import request from "request-promise";

export default async (req, res) => {
  console.log("posting");
  const { tweet } = req.body;
  const { handle } = req.query;
  try {
    console.log("trying to get auth");
    const authOptions = {
      method: "GET",
      url: `${process.env.AUTH0_REDIRECT_URI}/api/team/tokens/get/${handle}`,
      headers: {
        Authorization: req.headers.authorization || req.cookies.access_token
      },
      json: true
    };
    const { tokenKey, tokenSecret } = await request(authOptions);
    const client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: tokenKey,
      access_token_secret: tokenSecret
    });
    client.post("statuses/update", { status: tweet }, function(
      error,
      tweet,
      response
    ) {
      if (error) throw error;
      console.log(tweet); // Tweet body.
    });
    // ok
    res.status(200).json({ ok: true });
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
