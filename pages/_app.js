import { SWRConfig } from "swr";
import "@styles/global.css";

import MarketingLayout from "@components/layouts/marketing";

const App = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout || ((page) => <MarketingLayout children={page} />);

  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </SWRConfig>
  );
};

export default App;
