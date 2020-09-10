export const getRedirectUrl = (req, res) => {
  // * If defined, this is a Preview Deployment with an existing cookie set
  if (req.cookies.redirect_uri) return req.cookies.redirect_uri;

  // * If true, this is a Preview Deployment with no existing cookie set
  if (!!process.env.VERCEL_GITHUB_COMMIT_SHA) {
    // * Extract URL from the headers
    const url = new URL(req.headers.referer);

    // * Return the origin as the path is not require
    return url.origin;
    // * If not defined, use environment variables instead
  } else {
    return process.env.AUTH0_REDIRECT_URI;
  }
};
