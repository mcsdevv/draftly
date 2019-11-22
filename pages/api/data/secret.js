const verify = require("../_util/token/verify");

module.exports = (req, res) => {
  const isVerified = err => {
    if (!err) {
      res.send("You're logged in via Auth0!");
    } else {
      res.send("Log in so I can tell you my secret!");
    }
  };
  if (req.cookies.access_token) {
    verify(req.cookies.access_token, isVerified);
  } else {
    res.send("Log in so I can tell you my secret!");
  }
};
