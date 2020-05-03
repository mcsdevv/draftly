import { useState } from "react";
import ScopeContext from "../context/scopeContext";
import { SWRConfig } from "swr";
import "../styles/global.css";

const App = ({ Component, pageProps }) => {
  const [scope, setScope] = useState(null);
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
      }}
    >
      <ScopeContext.Provider value={{ scope, setScope }}>
        <Component {...pageProps} />
      </ScopeContext.Provider>
    </SWRConfig>
  );
};

export default App;
