import oauth from "../../../_util/oauth";
import request from "request-promise";
import jwt from "jsonwebtoken";

export default (req, res) => {
  const { oauth_token, oauth_verifier } = req.query;
  // * Get users access tokens
  oauth.getOAuthAccessToken(
    oauth_token,
    process.env.TWITTER_ACCESS_TOKEN_SECRET,
    oauth_verifier,
    async function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
      // * Verify credentials prior to saving in the database
      oauth.get(
        "https://api.twitter.com/1.1/account/verify_credentials.json",
        oauthAccessToken,
        oauthAccessTokenSecret,
        async function(error, data, response) {
          if (error) {
            res.send("Error getting twitter screen name : " + error);
          } else {
            const accountData = JSON.parse(data);
            // * Check if the team exists currently
            const existsOptions = {
              method: "GET",
              url: `${process.env.AUTH0_REDIRECT_URI}/api/team/exists/${accountData.screen_name}`,
              headers: {
                Authorization: req.cookies.access_token
              },
              json: true
            };
            const { exists } = await request(existsOptions);
            // * If it exists, update tokens, else create team
            if (exists) {
              const updateTokenOptions = {
                method: "PATCH",
                url: `${process.env.AUTH0_REDIRECT_URI}/api/team/tokens/update`,
                body: {
                  handle: accountData.screen_name,
                  tokenKey: oauthAccessToken,
                  tokenSecret: oauthAccessTokenSecret
                },
                headers: {
                  Authorization: req.cookies.access_token
                },
                json: true
              };
              await request(updateTokenOptions);
            } else {
              // * Get email from id_token to set team owner
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
                headers: {
                  Authorization: req.cookies.access_token
                },
                json: true
              };
              await request(createTeamOptions);
            }
            res.writeHead(301, {
              Location: "/dashboard"
            });
            res.end();
          }
        }
      );
    }
  );
};
