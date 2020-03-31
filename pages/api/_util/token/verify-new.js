import jwt from "jsonwebtoken";
import { decrypt } from "./encryption";

const verify = (handler) => async (req, res) => {
  console.log('yo')
  // * Get token from 
  const token = req.headers.authorization || req.cookies.access_token;
  // * Provide options to verify the JWT with
  const options = {
    algorithms: ["RS256"],
    maxAge: "1 day"
  };
  // * Check token length != false,
  if (!!token?.length) {
    try {
      // * Decrypt token
      const tokenDecrypted = decrypt(token);
      // * Decode decrypted token
      const tokenDecoded = jwt.decode(tokenDecrypted);
      // * Verify audience correct
      if (!tokenDecoded.aud.includes(process.env.AUTH0_AUDIENCE)) {
        console.log("Error authenticating: incorrect audience");
        return handler(req, res, "Error authenticating: No token present");
      }
      // * Verify JWT using about methods
      jwt.verify(tokenDecrypted, process.env.AUTH0_PUBLIC_KEY, options);
      return handler(req, res);
    } catch (err) {
      console.log("Error verifying:", err.message);
      return handler(req, res, err.message);
    }
  } else {
    // * Supply callback with error if token length != true
    console.log("Error authenticating: no token present");
    return handler(req, res, "Error authenticating: No token present");
  }
};

export default verify