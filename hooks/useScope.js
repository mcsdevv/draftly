import { useContext } from "react";
import { useRouter } from "next/router";
import ScopeContext from "../context/scopeContext";

import { useProfile } from "../hooks/";

export const useScope = () => {
  const { scope, setScope } = useContext(ScopeContext);
  const { teams } = useProfile();
  const router = useRouter();
  const updateScope = (e) => {
    const name = e.target.value;
    if (name === "new") {
      router.push("/api/auth/twitter/connect");
      return;
    }
    const scopeDetails = teams.find((t) => t.handle === name);
    setScope({ ...scopeDetails });
  };
  return { scope, setScope, updateScope };
};
