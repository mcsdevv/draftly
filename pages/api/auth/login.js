import cookie from "cookie";
import { v4 as uuidv4 } from "uuid";
import cookieOptions from "@lib/api/cookie/options";
import withSentry from "@lib/api/middleware/withSentry";

const login = async (req, res) => {
  // * Generate random opaque value for state and nonce
  const state = uuidv4();
  const nonce = uuidv4();

  // * Add state and nonce as httpOnly cookie for callback to check
  res.setHeader("Set-Cookie", [
    cookie.serialize("state", String(state), cookieOptions(true, false)),
    cookie.serialize("nonce", String(nonce), cookieOptions(true, false)),
  ]);

  console.log("preview?", !!process.env.VERCEL_GITHUB_COMMIT_SHA);

  // * Write redirect including openid, profile, and email scopes
  res.writeHead(302, {
    Location: `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&audience=${process.env.AUTH0_AUDIENCE}&client_id=${process.env.AUTH0_CLIENT_ID}&redirect_uri=${process.env.AUTH0_REDIRECT_URI}/api/auth/callback&scope=openid%20profile%20email%20&state=${state}&nonce=${nonce}`,
  });
  res.end();
};

export default withSentry(login);

// ! If localhost appears in callback URL on Auth0, consent skipping will not work.
