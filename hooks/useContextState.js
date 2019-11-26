import { useEffect, useState } from "react";
import { useUserState } from "./useUserState";

export const useContextState = () => {
  const user = useUserState();
  const [contexts, setContextState] = useState(undefined);
  useEffect(() => {
    async function getContexts() {
      const existingContext = localStorage.getItem("contexts");
      if (existingContext) {
        const state = JSON.parse(existingContext);
        setContextState({ ...state });
      }
      if (user && user.contexts.length > 0) {
        const state = { selected: user.contexts[0], list: user.contexts };
        localStorage.setItem("contexts", JSON.stringify(state));
        setContextState({ ...state });
      }
    }
    getContexts();
  }, [user]);
  const setContext = e => {
    const state = { ...contexts, selected: e.target.value };
    localStorage.setItem("contexts", JSON.stringify(state));
    setContextState({ ...state });
  };
  console.log("NEW", contexts);
  return { contexts, setContext };
};
