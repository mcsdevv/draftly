import React from "react";
import App from "next/app";
import ScopeContext from "../context/scopeContext";
import { withRouter } from "next/router";
import { SWRConfig } from "swr";

import "../styles/global.css";

export default withRouter(
  class MyApp extends App {
    state = {
      scope: undefined,
    };
    componentDidMount = () => {
      const scopeStored = localStorage.getItem("scope");
      if (scopeStored !== undefined) {
        const scope = JSON.parse(scopeStored);
        this.setScope(scope);
      }
    };
    setScope = (scope) => {
      localStorage.setItem("scope", JSON.stringify(scope));
      this.setState({ scope });
    };
    render() {
      const { Component, pageProps } = this.props;
      return (
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher: (...args) => fetch(...args).then((res) => res.json()),
          }}
        >
          <ScopeContext.Provider
            value={{
              scope: this.state.scope,
              setScope: this.setScope,
            }}
          >
            <Component {...pageProps} />
          </ScopeContext.Provider>
        </SWRConfig>
      );
    }
  }
);
