import { useEffect } from "react";
import Cookies from "js-cookie";
import useSWR from "swr";
import useUser from "./use-user";

export default function useScope() {
  const options = {
    fetcher: undefined,
    initiaData: {},
  };
  const { data: scope, mutate: setScope } = useSWR("/scope", options);
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
}
