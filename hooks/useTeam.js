import useSWR from "swr";
import { useContext } from "react";
import ScopeContext from "../context/scopeContext";

export const useTeam = () => {
  const { scope } = useContext(ScopeContext);
  if (scope !== undefined) {
    const { data: team } = useSWR(`/api/team/details/${scope}`);
    return { ...team, scope };
  }
  return undefined;
};
