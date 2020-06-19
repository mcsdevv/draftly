import { useEffect } from "react";
import Cookies from "js-cookie";
import useSWR from "swr";
import { useUser } from "./";

export const useScope = () => {
  const { data: scope, mutate: setScope } = useSWR("/scope", {
    fetcher: undefined,
    initiaData: {},
  });
  const { teams } = useUser();
  useEffect(() => {
    function setNewScope() {
      if (teams) {
        const newScope = teams[0];
        Cookies.set("tuid", newScope.tuid);
        setScope({ ...newScope });
      }
    }
    setNewScope();
  }, [teams]);
  return [scope, setScope];
};
