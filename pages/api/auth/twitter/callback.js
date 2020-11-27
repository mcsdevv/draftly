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
            const team = await prisma.teams.findUnique({
              where: { handle: accountData.screen_name },
            });

            // * If the team exists, update tokens
            if (team) {
              console.log("Team already exists:", exists.tuid);
              await prisma.teams.update({
                where: { handle: accountData.screen_name },
                data: {
                  tokenKey: oauthAccessToken,
                  tokenSecret: oauthAccessTokenSecret,
                },
              });
            } else {
              // * If team does not exist, prepare for creation
              console.log(`Team ${accountData.screen_name} does not exist.`);
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
                  tokenKey: oauthAccessToken,
                  tokenSecret: oauthAccessTokenSecret,
                  inviteCode,
                  uid: decrypt(req.cookies.uid),
                },
              });

              // * Insert team member as a team owner
              // ! tmuid required because Prisma sucks and hates composite keys https://github.com/prisma/prisma/discussions/2149
              await prisma.members.create({
                data: {
                  role: "owner",
                  tuid,
                  uid: decrypt(req.cookies.uid),
                  tmuid: `${decrypt(req.cookies.uid)}_${tuid}`,
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
