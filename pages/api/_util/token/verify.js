import jwt from "jsonwebtoken";
import { decrypt } from "../token/encryption";

// TODO Accept scope parameter, check as part of JWT validation

module.exports = async (token, callback) => {
  // * Provide options to verify the JWT with
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
        console.log("Error verifying: incorrect audience");
        return callback("Error verifying: incorrect audience");
      }
      // * Verify JWT using about methods
      jwt.verify(tokenDecrypted, process.env.AUTH0_PUBLIC_KEY, options);
      return callback();
    } catch (err) {
      console.log("Error verifying:", err.message);
      callback(err.message);
      return;
    }
  } else {
    // * Supply callback with error if token length != true
    console.log("Error verifying: no token present");
    return callback("No token present");
  }
};
