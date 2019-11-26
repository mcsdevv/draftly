import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";

export const useContextState = () => {
  const { user } = useContext(UserContext);
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
