const OAuth = require("oauth");

const oauth = new OAuth.OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_CONSUMER_SECRET,
  "1.0A",
  process.env.TWITTER_OAUTH_CALLBACK,
  "HMAC-SHA1"
);

module.exports = oauth;
