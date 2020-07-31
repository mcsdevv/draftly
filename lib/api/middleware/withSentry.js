import * as Sentry from "@sentry/node";

// * Enable Sentry only for deployments
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

const withSentry = (handler) => async (req, res, uid, tuid) => {
  try {
    // * Return the handler function
    return await hadle(req, res, uid, tuid);

    // * Catch errors if present and report to Sentry
  } catch (err) {
    console.error(`Error: ${err.message}`);
    Sentry.captureException(err);
    await Sentry.flush(2000);
    return res.status(500).json({ err: err.message });
  }
};

export default withSentry;
