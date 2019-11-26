import { useEffect, useState } from "react";

export const useContextState = contextList => {
  const [context, setContextState] = useState(undefined);
  useEffect(() => {
    function getContext() {
      if (contextList && contextList.length > 0) {
        setContextState(contextList[0]);
      }
    }
    getContext();
  }, []);
  const setContext = e => setContextState(e.target.value);
  return { context, setContext };
};
