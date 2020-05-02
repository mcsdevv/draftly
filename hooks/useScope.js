import { useContext, useEffect } from "react";
import ScopeContext from "../context/scopeContext";

import { useProfile } from "../hooks/";

export const useScope = () => {
  const { scope, setScope } = useContext(ScopeContext);
  const { teams } = useProfile();
  const setStoredScope = (newScope) => {
    localStorage.setItem("scope", JSON.stringify(newScope));
    setScope(newScope);
  };
  useEffect(() => {
    function getStoredScope() {
      const scopeStored = localStorage.getItem("scope");
      if (!!scopeStored) {
        const newScope = JSON.parse(scopeStored);
        setStoredScope(newScope);
      }
      if (teams) {
        setStoredScope(teams[0]);
      }
    }
    getStoredScope();
  }, [scope, teams]);
  return { scope, setStoredScope };
};
