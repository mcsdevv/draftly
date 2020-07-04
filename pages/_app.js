// * Libraries
import Head from "next/head";
import { RadixProvider } from "@modulz/radix";
import { SWRConfig } from "swr";

// * Components
import MarketingLayout from "@components/layouts/marketing";

// * Styles
import "@styles/global.css";

const App = ({ Component, pageProps }) => {
  // * Use static layout from component, falling back to marketing
  const getLayout =
    Component.getLayout || ((page) => <MarketingLayout children={page} />);

  // * Set default fetcher for SWR to return JSON
  return (
    <>
      <Head>
        <title>Tweet Review</title>
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
        <RadixProvider>{getLayout(<Component {...pageProps} />)}</RadixProvider>
      </SWRConfig>
    </>
  );
};

export default App;
