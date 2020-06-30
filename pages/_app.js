// * Libraries
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
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </SWRConfig>
  );
};

export default App;
