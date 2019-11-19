const oauth = require("../../_util/oauth");

module.exports = async (req, res) => {
  console.log(process.env.TWITTER_ACCESS_TOKEN);
  oauth.get(
    "https://api.twitter.com/oauth/request_token",
    process.env.TWITTER_ACCESS_TOKEN,
    process.env.TWITTER_ACCESS_TOKEN_SECRET,
    function(error, data, response) {
      if (error) console.error(error);
      const obj = data.split("&").reduce(function(prev, curr, i, arr) {
        const p = curr.split("=");
        prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
        return prev;
      }, {});
      res.end(JSON.stringify({ data: obj }));
    }
  );
};
