require("dotenv").config();
module.exports = {
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_REDIRECT_URI: process.env.AUTH0_REDIRECT_URI,
    ENCRYPTON_KEY: process.env.ENCRYPTON_KEY,
    TWITTER_OAUTH_CALLBACK: process.env.TWITTER_OAUTH_CALLBACK,
    TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    FAUNADB_SECRET_KEY: process.env.FAUNADB_SECRET_KEY,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  },
  reactStrictMode: true,
  experimental: { reactRefresh: true },
};
