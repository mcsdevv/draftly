export const getRedirectUrl = (req) => {
  // * If defined, this is a Preview Deployment
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
