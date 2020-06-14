import oauth from "../../_util/oauth";

import { query } from "../../_util/db";
import uuidv4 from "uuid/v4";
import createInviteCode from "../../../../lib/createInviteCode";
const escape = require("sql-template-strings");

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
            res.send("Error getting twitter screen name:" + error);
          } else {
            const accountData = JSON.parse(data);

            // * Check if the team exists currently
            const exists = await query(
              escape`SELECT * FROM teams
              WHERE handle = ${accountData.screen_name}`
            );

            // * If it exists, update tokens, else create team
            if (exists) {
              // TODO Update tokens for the team
              // await fetch(
              //   `${process.env.AUTH0_REDIRECT_URI}/api/team/tokens/update`,
              //   {
              //     method: "PATCH",
              //     body: JSON.stringify({
              //       handle: accountData.screen_name,
              //       tokenKey: oauthAccessToken,
              //       tokenSecret: oauthAccessTokenSecret,
              //     }),
              //     headers: {
              //       Authorization: req.cookies.access_token,
              //     },
              //   }
              // );
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
