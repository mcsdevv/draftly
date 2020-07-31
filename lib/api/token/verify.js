import jwt from "jsonwebtoken";
import * as Sentry from "@sentry/node";
import { decrypt } from "./encryption";

const verify = (handler) => async (req, res) => {
  // * Get token from headers or cookies
  const token = req.headers.authorization || req.cookies.access_token;

  // * Provide options to verify the JWT with
  const options = {
    algorithms: ["RS256"],
    maxAge: "1 day",
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
        console.error("Error authenticating: incorrect audience");
        return res.status(403).json({ err: "Incorrect audience" });
      }

      // * Verify access_token
      jwt.verify(tokenDecrypted, process.env.AUTH0_PUBLIC_KEY, options);

      // * Verify id_token to prevent false representation
      jwt.verify(req.cookies.id_token, process.env.AUTH0_PUBLIC_KEY, options);

      // * Decrypt uid to prevent false representation
      const uid = decrypt(req.cookies.uid);

      // * Get tuid scope from cookies;
      const { tuid } = req.cookies;

      // * Return handler with uid added
      try {
        return await handler(req, res, uid, tuid);
      } catch (error) {
        console.error(error);
        Sentry.captureException(error);
        await Sentry.flush(2000);
        throw error;
      }
    } catch (err) {
      console.error("Error verifying:", err.message);
      return res.status(401).json({ err: err.message });
    }
  } else {
    // * Supply callback with error if token length != true
    console.error("Error authenticating: no token present");
    return res.status(401).json({ err: "No token present" });
  }
};

export default verify;
