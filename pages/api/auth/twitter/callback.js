import oauth from "@lib/api/oauth";

import { escape, query } from "@lib/api/db";
import { v4 as uuidv4 } from "uuid";
import createInviteCode from "@lib/api/createInviteCode";
import withSentry from "@lib/api/middleware/withSentry";
import { decrypt } from "@lib/api/token/encryption";

const twitterCallback = (req, res) => {
  const { denied, oauth_token, oauth_verifier } = req.query;

  // * If the request was cancelled by the user, redirect to the dashboard
  if (denied) {
    res.writeHead(301, {
      Location: "/dashboard",
    });
    res.end();
  }

  // * Get users access tokens
  oauth.getOAuthAccessToken(
    oauth_token,
    process.env.TWITTER_ACCESS_TOKEN_SECRET,
    oauth_verifier,
    async function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
      // * Verify credentials prior to saving in the database
      oauth.get(
        "https://api.twitter.com/1.1/account/verify_credentials.json",
        oauthAccessToken,
        oauthAccessTokenSecret,
        async function (error, data, response) {
          // * Check for error in verifying credentials
          if (error) {
            // TODO Improve error handling
            res.status(404).send("Error getting twitter screen name:" + error);
          } else {
            // * If no error, parse the JSON for the account data
            const accountData = JSON.parse(data);

            // * Check if the team exists currently
            const [exists] = await query(
              escape`SELECT * FROM teams
              WHERE handle = ${accountData.screen_name}`
            );

            // * If the team exists, update tokens
            if (exists) {
              console.log("Team already exists:", exists.tuid);
              await query(
                escape`UPDATE teams 
                SET token_key = ${oauthAccessToken} token_secret = ${oauthAccessTokenSecret} 
                WHERE handle = ${accountData.screen_name}`
              );
            } else {
              // * If team does not exist, prepare for creation
              console.log("Team does not exist.");
              const tuid = uuidv4();
              const inviteCode = createInviteCode();
              const {
                name,
                profile_image_url_https,
                screen_name,
              } = accountData;

              // * Insert team into database
              await query(
                escape`INSERT INTO teams (tuid, name, protected, handle, avatar, reviews_required, plan, token_secret, token_key, invite_code)
                VALUES (${tuid}, ${name}, ${accountData.protected}, ${screen_name}, ${profile_image_url_https}, 0, 'free', ${oauthAccessTokenSecret}, ${oauthAccessToken}, ${inviteCode})`
              );

              // * Insert team member as a team owner
              await query(
                escape`INSERT INTO teams_members (uid, tuid, role)
                VALUES (${decrypt(req.cookies.uid)}, ${tuid}, 'owner')`
              );

              console.log("Team created:", tuid);
              console.log("Team created by:", decrypt(req.cookies.uid));
            }

            // * Redirect to dashboard after team creation
            res.writeHead(301, {
              Location: "/dashboard",
            });
            res.end();
          }
        }
      );
    }
  );
};

export default withSentry(twitterCallback);
