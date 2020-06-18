import { useContext, useEffect } from "react";
import ScopeContext from "../context/scopeContext";
import Cookies from "js-cookie";

import { useUser } from "./";

export const useScope = () => {
  const { scope, setScope } = useContext(ScopeContext);
  const { teams } = useUser();
  useEffect(() => {
    function setNewScope() {
      if (teams) {
        const newScope = teams[0];
        Cookies.set("tuid", newScope.tuid);
        setScope(newScope);
      }
    }
    setNewScope();
  }, [teams]);
  return { scope, setStoredScope };
};
