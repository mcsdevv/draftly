// * Libraries
import Head from "next/head";
import * as Sentry from "@sentry/node";
import { RadixProvider } from "@modulz/radix";

// * Components
import MarketingLayout from "@components/layouts/pages/marketing";

// * Styles
import "@styles/global.css";

// * Initialize Sentry
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

const App = ({ Component, pageProps, err }) => {
  // * Use static layout from component, falling back to marketing
  const getLayout =
    Component.getLayout || ((page) => <MarketingLayout children={page} />);

  return (
    <>
      <Head>
        <title>Draftly</title>
        <meta
          name="description"
          content="Draft, review, approve, and publish tweets."
        />
      </Head>
      <RadixProvider>
        {getLayout(<Component {...pageProps} err={err} />)}
      </RadixProvider>
    </>
  );
};

export default App;
