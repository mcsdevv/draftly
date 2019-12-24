import { useContext } from "react";
import ScopeContext from "../context/scopeContext";

import { useUser } from "../hooks/";

export const useScope = () => {
  const { scope, setScope } = useContext(ScopeContext);
  const { teams, user } = useUser();
  const updateScope = e => {
    const name = e.target.value;
    if (name === "new") {
      localStorage.removeItem("scope");
      window.location = "/api/auth/twitter/connect";
      return;
    }
    const isPersonal = user.name === name;
    const scopeDetails = isPersonal ? user : teams.find(t => t.handle === name);
    setScope({ ...scopeDetails, personal: isPersonal });
  };
  return { scope, setScope, updateScope };
};
