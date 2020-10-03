// * Libraries
import prisma from "@lib/api/db/prisma";
import oauth from "@lib/api/oauth";
import { v4 as uuidv4 } from "uuid";

// * Middleware
import withSentry from "@lib/api/middleware/withSentry";

// * Utilities
import createInviteCode from "@lib/api/createInviteCode";
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
            const team = await prisma.teams.findOne({
              where: { handle: accountData.screen_name },
            });

            // * If the team exists, update tokens
            if (team) {
              console.log("Team already exists:", exists.tuid);
              await prisma.teams.update({
                where: { handle: accountData.screen_name },
                data: {
                  token_key: oauthAccessToken,
                  token_secret: oauthAccessTokenSecret,
                },
              });
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
              await prisma.teams.create({
                data: {
                  tuid,
                  name,
                  protected: accountData.protected,
                  handle: screen_name,
                  avatar: profile_image_url_https,
                  reviewsRequired: 0,
                  plan: "free",
                  token_key: oauthAccessToken,
                  token_secret: oauthAccessTokenSecret,
                  inviteCode,
                  createdBy: decrypt(req.cookies.uid),
                },
              });

              // * Insert team member as a team owner
              await prisma.teams_members.create({
                data: {
                  uid: decrypt(req.cookies.uid),
                  tuid,
                  role: "owner",
                },
              });

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
