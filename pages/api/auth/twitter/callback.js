import oauth from "../../_util/oauth";

import { escape, query } from "@lib/api/db";
import uuidv4 from "uuid/v4";
import createInviteCode from "@lib/api/createInviteCode";

export default (req, res) => {
  const { oauth_token, oauth_verifier } = req.query;
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
          if (error) {
            res.status(404).send("Error getting twitter screen name:" + error);
          } else {
            const accountData = JSON.parse(data);

            // * Check if the team exists currently
            const exists = await query(
              escape`SELECT * FROM teams
              WHERE handle = ${accountData.screen_name}`
            );

            // * If it exists, update tokens, else create team
            if (exists) {
              await query(
                escape`UPDATE teams 
                SET token_key = ${oauthAccessToken} token_secret = ${oauthAccessTokenSecret} 
                WHERE handle = ${accountData.screen_name}`
              );
            } else {
              // * Prepare data for insert
              const uuid = uuidv4();
              const inviteCode = createInviteCode();
              const {
                name,
                profile_image_url_https,
                screen_name,
              } = accountData;

              // * Insert team into database
              await query(
                escape`INSERT INTO teams (tuid, name, protected, handle, avatar, reviews_required, plan, token_secret, token_key, invite_code)
                VALUES (${uuid}, ${name}, ${accountData.protected}, ${screen_name}, ${profile_image_url_https}, 0, 'free', ${oauthAccessTokenSecret}, ${oauthAccessToken}, ${inviteCode})`
              );

              // * Insert team member
              await query(
                escape`INSERT INTO team_members (uid, tuid, role)
                VALUES (${req.cookies.uid}, ${uuid}, 'owner')`
              );
            }
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
