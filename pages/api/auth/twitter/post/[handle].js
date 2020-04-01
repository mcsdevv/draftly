const Twitter = require("twitter");
import request from "request-promise";

export default async (req, res) => {
  const { tweet } = req.body;
  const { handle } = req.query;
  try {
    // * Get auth keys for account
    const authOptions = {
      method: "GET",
      url: `${process.env.AUTH0_REDIRECT_URI}/api/team/tokens/get/${handle}`,
      headers: {
        Authorization: req.headers.authorization || req.cookies.access_token
      },
      json: true
    };
    const { tokenKey, tokenSecret } = await request(authOptions);
    // * Create new Twitter client with account and application keys
    const client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: tokenKey,
      access_token_secret: tokenSecret
    });
    // * Post tweet
    client.post("statuses/update", { status: tweet }, function(
      error,
      tweet,
      response
    ) {
      if (error) throw error;
      console.error("Error posting tweet: ", tweet);
    });
    console.log("Tweet successfully posted for:", handle);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("ERROR - api/twitter/post -", err.message);
    res.status(500).json({ err: err.message });
  }
};
