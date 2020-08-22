import oauth from "@lib/api/oauth";
import withSentry from "@lib/api/middleware/withSentry";

const twitterConnect = (_req, res) => {
  oauth.getOAuthRequestToken(function (error, oauthToken, oauthTokenSecret) {
    // * Check for an error receiving request tokens
    if (error) {
      res
        .status(500)
        .json({ message: "Error getting OAuth request token", error });
    } else {
      // * Redirect to authorization endpoint to get access tokens
      res.writeHead(301, {
        "Cache-Control": "no-store",
        Location: `https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`,
      });
      res.end();
    }
  });
};

export default withSentry(twitterConnect);
