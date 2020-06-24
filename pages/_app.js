import { SWRConfig } from "swr";
import "@styles/global.css";

const App = ({ Component, pageProps }) => (
  <SWRConfig
    value={{
      refreshInterval: 0,
      fetcher: (...args) => fetch(...args).then((res) => res.json()),
    }}
  >
    <Component {...pageProps} />
  </SWRConfig>
);

export default App;
