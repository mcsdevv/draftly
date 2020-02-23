import { useContext } from "react";
import ScopeContext from "../context/scopeContext";

import { useProfile } from "../hooks/";

export const useScope = () => {
  const { scope, setScope } = useContext(ScopeContext);
  const { teams } = useProfile();
  const updateScope = e => {
    const name = e.target.value;
    if (name === "new") {
      localStorage.removeItem("scope");
      window.location = "/api/auth/twitter/connect";
      return;
    }
    const scopeDetails = teams.find(t => t.handle === name);
    setScope({ ...scopeDetails });
  };
  return { scope, setScope, updateScope };
};
