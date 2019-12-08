import { useContext, useEffect, useState } from "react";
import ScopeContext from "../context/scopeContext";

import { useUser } from "../hooks/useUser";

export const useScope = () => {
  const { scope, setScope } = useContext(ScopeContext);
  const { user } = useUser();
  const [scopeDetails, setScopeDetails] = useState(undefined);
  useEffect(() => {
    if (user) {
      const isPersonal = user.scopes[0].name === scope.name;
      const details = isPersonal
        ? user.scopes[0]
        : user.scopes.find(s => s.handle === scope.name);
      if (details) {
        setScopeDetails({
          personal: details.type === "personal",
          role: details.role
        });
      }
    }
  }, [scope, user]);
  const updateScope = e => {
    const name = e.target.value;
    if (name === "new") {
      localStorage.removeItem("scope");
      window.location = "/api/auth/twitter/connect";
      return;
    }
    const isPersonal = user.scopes[0].name === name;
    const details = isPersonal
      ? user.scopes[0]
      : user.scopes.find(s => s.handle === name);
    const { role, type } = details;
    setScope({ name, role, type });
  };
  return { scope, scopeDetails, updateScope };
};
