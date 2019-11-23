const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const { decrypt } = require("../token/encryption");

module.exports = async (token, callback) => {
  // create a client to retrieve secret keys
  const client = jwksClient({
    cache: true,
    cacheMaxEntries: 10,
    cacheMaxAge: 86400000, // 24 hours
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  });
  // create a function that uses the secret keys
  function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key) {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }
  // provide additional options to verify the JWT with
  const options = {
    algorithms: ["RS256"],
    maxAge: "1 day"
  };
  // check token length != false,
  if (!!token.length) {
    // decrypt token
    const tokenDecrypted = decrypt(token);
    try {
      // verify JWT using about methods
      jwt.verify(tokenDecrypted, getKey, options, callback);
      // verify audience correct
      tokenDecrypted.includes(process.env.AUTH0_AUDIENCE);
      console.log("TEST", tokenDecrypted);
      // TODO - https://auth0.com/docs/tokens/guides/access-token/validate-access-token#custom-api-access-tokens
      // TODO - Check scopes - may not be applicable due to teams
    } catch (err) {
      callback(err);
    }
  } else {
    // supply callback with error if token length != true
    callback(true);
  }
};
