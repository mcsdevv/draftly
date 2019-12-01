import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { decrypt } from "../token/encryption";

// TODO Accept scope parameter, check as part of JWT validation

module.exports = async (token, callback) => {
  // * Create a client to retrieve secret keys
  const client = jwksClient({
    cache: true,
    cacheMaxEntries: 10,
    cacheMaxAge: 86400000, // 24 hours
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  });
  // * Create a function that uses the secret keys
  function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key) {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }
  // * Provide additional options to verify the JWT with
  const options = {
    algorithms: ["RS256"],
    maxAge: "1 day"
  };
  // * Check token length != false,
  if (!!token.length) {
    // * Decrypt token
    const tokenDecrypted = decrypt(token);
    try {
      // * Decode decrypted token
      const tokenDecoded = jwt.decode(tokenDecrypted);
      // * Verify audience correct
      if (!tokenDecoded.aud.includes(process.env.AUTH0_AUDIENCE)) {
        const err = "Incorrect audience.";
        callback(err);
        return;
      }
      // * Verify JWT using about methods
      jwt.verify(tokenDecrypted, getKey, options, callback);
    } catch (err) {
      callback(err);
      return;
    }
  } else {
    // * Supply callback with error if token length != true
    callback(true);
    return;
  }
};
