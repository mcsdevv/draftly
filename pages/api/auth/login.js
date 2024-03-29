// * Libraries
import cookie from "cookie";
import { v4 as uuidv4 } from "uuid";
import { stringify } from "querystring";

// * Helpers
import cookieOptions from "@lib/api/cookie/options";
import withSentry from "@lib/api/middleware/withSentry";
import { getRedirectUrl } from "@lib/api/getRedirectUrl";

const login = async (req, res) => {
  // * Generate random opaque value for state and nonce
  const state = uuidv4();
  const nonce = uuidv4();

  // * Generate redirect_uri based on the environment
  const redirect_uri = getRedirectUrl(req, res);

  // * Add state and nonce as httpOnly cookie for callback to check
  res.setHeader("Set-Cookie", [
    cookie.serialize("state", String(state), cookieOptions(true, false)),
    cookie.serialize("nonce", String(nonce), cookieOptions(true, false)),
    cookie.serialize(
      "redirect_uri",
      String(redirect_uri),
      cookieOptions(true, false)
    ),
  ]);

  // * Format query string
  const query = stringify({
    response_type: "code",
    audience: process.env.AUTH0_AUDIENCE,
    client_id: process.env.AUTH0_CLIENT_ID,
    redirect_uri: `${redirect_uri}/api/auth/callback`,
    scope: "openid profile email",
    state,
    nonce,
  });

  // * Write redirect including openid, profile, and email scopes
  res.writeHead(302, {
    Location: `https://${process.env.AUTH0_DOMAIN}/authorize?${query}`,
  });
  res.end();
};

export default withSentry(login);

// ! If localhost appears in callback URL on Auth0, consent skipping will not work.
