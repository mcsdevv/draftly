import oauth from "@lib/api/oauth";

export default (req, res) => {
  // TODO Stop request from getting cached, causes 'old request token' error.
  oauth.getOAuthRequestToken(function (error, oauthToken, oauthTokenSecret) {
    // * Check for an error receiving request tokens
    if (error) {
      res
        .status(500)
        .json({ message: "Error getting OAuth request token", error });
    } else {
      // * Redirect to authorization endpoint to get access tokens
      res.writeHead(301, {
        Location: `https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`,
      });
      res.end();
    }
  });
};
