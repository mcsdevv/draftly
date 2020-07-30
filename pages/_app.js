// * Libraries
import Head from "next/head";
import * as Sentry from "@sentry/node";
import { RadixProvider } from "@modulz/radix";
import { SWRConfig } from "swr";

// * Components
import MarketingLayout from "@components/layouts/marketing";

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

  // * Set default fetcher for SWR to return JSON
  return (
    <>
      <Head>
        <title>Draftly</title>
        <meta
          name="description"
          content="Draft, review, approve, and publish tweets."
        />
      </Head>
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
        }}
      >
        <RadixProvider>
          {getLayout(<Component {...pageProps} err={err} />)}
        </RadixProvider>
      </SWRConfig>
    </>
  );
};

export default App;
