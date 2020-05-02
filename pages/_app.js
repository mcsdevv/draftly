import App from "next/app";
import ScopeContext from "../context/scopeContext";
import { SWRConfig } from "swr";

import "../styles/global.css";

export default class MyApp extends App {
  state = {
    scope: undefined,
  };
  componentDidMount = () => {
    const scopeStored = localStorage.getItem("scope");
    if (scopeStored !== undefined && scopeStored !== null) {
      const scope = JSON.parse(scopeStored);
      console.log("setting scope - CLASS");
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

// import { useEffect, useState } from "react";
// import ScopeContext from "../context/scopeContext";
// import { SWRConfig } from "swr";

// import "../styles/global.css";

// const App = ({ Component, pageProps }) => {
//   const [scope, setScope] = useState(undefined);
//   useEffect(() => {
//     function getStoredScope() {
//       const scopeStored = localStorage.getItem("scope");
//       if (scopeStored !== undefined && scopeStored !== null) {
//         const scope = JSON.parse(scopeStored);
//         console.log("setting scope - FUNCTION");
//         setStoredScope(scope);
//       }
//     }
//     getStoredScope();
//   }, []);
//   const setStoredScope = (newScope) => {
//     localStorage.setItem("scope", JSON.stringify(newScope));
//     setScope(newScope);
//   };
//   return (
//     <SWRConfig
//       value={{
//         refreshInterval: 0,
//         fetcher: (...args) => fetch(...args).then((res) => res.json()),
//       }}
//     >
//       <ScopeContext.Provider
//         value={{
//           scope,
//           setScope,
//         }}
//       >
//         <Component {...pageProps} />
//       </ScopeContext.Provider>
//     </SWRConfig>
//   );
// };

// export default App;
