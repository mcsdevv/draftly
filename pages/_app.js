import React from "react";
import App from "next/app";
import ScopeContext from "../context/scopeContext";
import { withRouter } from "next/router";
import { SWRConfig } from "swr";

import Header from "../components/header";

export default withRouter(
  class MyApp extends App {
    state = {
      scope: null
    };
    componentDidMount = () => {
      const scope = localStorage.getItem("scope");
      this.setState({ scope });
    };
    updateScope = e => {
      const scope = e.target.value;
      if (scope === "new") {
        window.location = "/api/auth/twitter/connect";
        return;
      } else {
        this.setState({ scope });
      }
    };
    render() {
      const { Component, pageProps } = this.props;
      return (
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher: (...args) => fetch(...args).then(res => res.json())
          }}
        >
          <ScopeContext.Provider
            value={{
              scope: this.state.scope,
              updateScope: this.updateScope
            }}
          >
            <Header />
            <Component {...pageProps} />
          </ScopeContext.Provider>
        </SWRConfig>
      );
    }
  }
);
