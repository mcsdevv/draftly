const oauth = require("../../../_util/oauth");
const Twitter = require("twitter");

export default (req, res) => {
  const { oauth_token, oauth_verifier } = req.query;
  console.log("TOKEN", oauth_token);
  console.log("VERIFIER", oauth_verifier);
  oauth.getOAuthAccessToken(
    oauth_token,
    process.env.TWITTER_ACCESS_TOKEN_SECRET,
    oauth_verifier,
    function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
      // TODO: store access tokens in DB to use when required.
      //   const client = new Twitter({
      //     consumer_key: process.env.TWITTER_CONSUMER_KEY,
      //     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      //     access_token_key: oauthAccessToken,
      //     access_token_secret: oauthAccessTokenSecret
      //   });
      //   client.post("statuses/update", { status: "test" }, function(
      //     error,
      //     tweet,
      //     response
      //   ) {
      //     if (error) throw error;
      //     console.log(tweet); // Tweet body.
      //   });
      //   res.writeHead(301, {
      //     Location: "/?worked=true"
      //   });
      //   res.end();
    }
  );
};
