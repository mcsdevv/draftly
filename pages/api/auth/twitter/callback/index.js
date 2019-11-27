const oauth = require("../../../_util/oauth");
const request = require("request-promise");
const jwt = require("jsonwebtoken");

// const Twitter = require("twitter");

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
        async function(error, data, response) {
          if (error) {
            res.send("Error getting twitter screen name : " + error);
          } else {
            const accountData = JSON.parse(data);
            console.log(accountData);
            // check if the team exists currently
            const existsOptions = {
              method: "GET",
              url: `${process.env.AUTH0_REDIRECT_URI}/api/team/exists/${accountData.screen_name}`,
              json: true
            };
            const { exists } = await request(existsOptions);
            // if it exists, update tokens, else create team
            if (exists) {
              console.log("UPDATING TEAM TOKENS");
              const updateTokenOptions = {
                method: "PATCH",
                url: `${process.env.AUTH0_REDIRECT_URI}/api/team/tokens/update`,
                body: {
                  name: accountData.screen_name,
                  tokenKey: oauthAccessToken,
                  tokenSecret: oauthAccessTokenSecret
                },
                json: true
              };
              await request(updateTokenOptions);
            } else {
              console.log("CREATING NEW TEAM");
              const { email } = jwt.decode(req.cookies.id_token);
              const createTeamOptions = {
                method: "POST",
                url: `${process.env.AUTH0_REDIRECT_URI}/api/team/create`,
                body: {
                  data: accountData,
                  email,
                  tokenKey: oauthAccessToken,
                  tokenSecret: oauthAccessTokenSecret
                },
                json: true
              };
              await request(createTeamOptions);
              res.writeHead(301, {
                Location: `/?accessToken=${oauthAccessToken}&accessTokenSecret=${oauthAccessTokenSecret}&name=${accountData.screen_name}`
              });
              res.end();
            }
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
