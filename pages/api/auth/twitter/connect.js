const oauth = require("../../_util/oauth");

export default (req, res) => {
  console.log("COOKIE TIME", req.cookies);
  // TODO Stop request from getting cached, causes 'old request token' error.
  oauth.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret) {
    if (error) {
      res.send(
        "Error getting OAuth request token : " + util.inspect(error),
        500
      );
    } else {
      res.writeHead(301, {
        Location: `https://api.twitter.com/oauth/authorize?oauth_token=${oauthToken}`
      });
      res.end();
    }
  });
};
