import { useEffect, useState } from "react";
import ScopeContext from "../context/scopeContext";
import { SWRConfig } from "swr";

import "../styles/global.css";

const App = ({ Component, pageProps }) => {
  const [scope, setScope] = useState(undefined);
  useEffect(() => {
    function getStoredScope() {
      const scopeStored = localStorage.getItem("scope");
      if (scopeStored !== undefined && scopeStored !== null) {
        const scope = JSON.parse(scopeStored);
        setStoredScope(scope);
      }
    }
    getStoredScope();
  }, []);
  const setStoredScope = (newScope) => {
    localStorage.setItem("scope", JSON.stringify(newScope));
    setScope(newScope);
  };
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
      }}
    >
      <ScopeContext.Provider value={{ scope, setScope: setStoredScope }}>
        <Component {...pageProps} />
      </ScopeContext.Provider>
    </SWRConfig>
  );
};

export default App;
