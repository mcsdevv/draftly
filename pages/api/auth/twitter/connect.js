const oauth = require("../../_util/oauth");

export default (req, res) => {
  console.log(
    "consumer key",
    process.env.TWITTER_CONSUMER_KEY,
    "consumer secret",
    process.env.TWITTER_CONSUMER_SECRET,
    "oauth callback",
    process.env.TWITTER_OAUTH_CALLBACK
  );
  // TODO Stop request from getting cached, causes 'old request token' error.
  oauth.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret) {
    if (error) {
      res
        .status(500)
        .json({ message: "Error getting OAuth request token", error });
    } else {
      res.writeHead(301, {
        Location: `https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`
      });
      res.end();
    }
  });
};
