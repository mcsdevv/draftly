import { useContext, useEffect, useState } from "react";
import ScopeContext from "../context/scopeContext";

import { useUser } from "../hooks/useUser";

export const useScope = () => {
  const { scope } = useContext(ScopeContext);
  const user = useUser();
  const [scopeDetails, setScopeDetails] = useState(undefined);
  useEffect(() => {
    if (user) {
      const details = user.scopes.filter(s => s.name === scope)[0];
      setScopeDetails({
        personal: details.type === "personal",
        role: details.role
      });
    }
  }, [scope]);
  return [scope, scopeDetails];
};
