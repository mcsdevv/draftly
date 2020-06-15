import { useContext, useEffect } from "react";
import ScopeContext from "../context/scopeContext";
import Cookies from "js-cookie";

import { useUser } from "./";

export const useScope = () => {
  const { scope, setScope } = useContext(ScopeContext);
  const { teams } = useUser();
  const setStoredScope = (newScope) => {
    localStorage.setItem("scope", JSON.stringify(newScope));
    Cookies.set("tuid", newScope.tuid);
    setScope(newScope);
  };
  useEffect(() => {
    function getStoredScope() {
      const scopeStored = localStorage.getItem("scope");
      if (!!scopeStored && scopeStored !== "undefined") {
        const newScope = JSON.parse(scopeStored);
        setStoredScope(newScope);
      }
      if (teams) {
        setStoredScope(teams[0]);
      }
    }
    getStoredScope();
  }, [teams]);
  return { scope, setStoredScope };
};
