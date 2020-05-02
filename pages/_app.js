import { useEffect, useState } from "react";
import ScopeContext from "../context/scopeContext";
import { SWRConfig } from "swr";

import "../styles/global.css";
// test
export default class MyApp extends App {
  state = {
    scope: undefined,
  };
  componentDidMount = () => {
    const scopeStored = localStorage.getItem("scope");
    if (scopeStored !== undefined && scopeStored !== null) {
      const scope = JSON.parse(scopeStored);
      this.setScope(scope);
    }
    }
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
