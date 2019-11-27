const oauth = require("../../../_util/oauth");
const Twitter = require("twitter");

export default (req, res) => {
  const { oauth_token, oauth_verifier } = req.query;
  // get users access tokens
  oauth.getOAuthAccessToken(
    oauth_token,
    process.env.TWITTER_ACCESS_TOKEN_SECRET,
    oauth_verifier,
    async function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
      // verify credentials prior to saving in the database
      oauth.get(
        "https://api.twitter.com/1.1/account/verify_credentials.json",
        oauthAccessToken,
        oauthAccessTokenSecret,
        function(error, data, response) {
          if (error) {
            console.log(error);
            res.send("Error getting twitter screen name : " + error);
          } else {
            console.log("data is %j", data);
            data = JSON.parse(data);
            // TODO: store access tokens in DB to use when required.
            res.writeHead(301, {
              Location: `/?accessToken=${oauthAccessToken}&accessTokenSecret=${oauthAccessTokenSecret}&name=${data.screen_name}`
            });
            res.end();
          }
        }
      );

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
    }
  );
};
