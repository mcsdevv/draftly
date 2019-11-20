const oauth = require("../../_util/oauth");

export default (req, res) => {
  oauth.get(
    "https://api.twitter.com/oauth/request_token",
    process.env.TWITTER_ACCESS_TOKEN,
    process.env.TWITTER_ACCESS_TOKEN_SECRET,
    function(error, data, response) {
      if (error) console.error("ERROR", error);
      const obj = data.split("&").reduce(function(prev, curr, i, arr) {
        const p = curr.split("=");
        prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
        return prev;
      }, {});
      // console.log("OBJ", obj);
      res.writeHead(301, {
        Location: `https://api.twitter.com/oauth/authorize?oauth_token=${obj.oauth_token}`
      });
      res.end();
    }
  );
};
