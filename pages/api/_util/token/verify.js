import jwt from "jsonwebtoken";
// import jwksClient from "jwks-rsa";
import { decrypt } from "../token/encryption";

// TODO Accept scope parameter, check as part of JWT validation

module.exports = async (token, callback) => {
  // * Create a client to retrieve secret keys
  // const client = jwksClient({
  //   cache: true,
  //   cacheMaxEntries: 10,
  //   cacheMaxAge: 86400000, // 24 hours
  //   jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  // });
  // * Create a function that uses the secret keys
  // function getKey(header, callback) {
  //   const start = new Date();
  //   client.getSigningKey(header.kid, function(err, key) {
  //     const signingKey = key.publicKey || key.rsaPublicKey;
  //     callback(null, signingKey);
  //   });
  // }
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
        return callback("Error verifying: incorrect audience");
      }
      // * Verify JWT using about methods
      console.log("KEYYYYYYYY", process.env.AUTH0_PUBLIC_KEY);
      // ! Changing Auth0 tenant to US may allow async method retrieving keys
      jwt.verify(tokenDecrypted, process.env.AUTH0_PUBLIC_KEY, options);
      return callback();
    } catch (err) {
      console.log("Error verifying:", err.message);
      callback(err.message);
      return;
    }
  } else {
    // * Supply callback with error if token length != true
    return callback("No token present");
  }
};
