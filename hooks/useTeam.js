import useSWR from "swr";
import { useContext } from "react";
import ScopeContext from "../context/scopeContext";

export const useTeam = () => {
  const { scope } = useContext(ScopeContext);
  if (scope !== undefined) {
    const { name } = scope;
    const { data: team } = useSWR(`/api/team/details/${name}`);
    return { ...team, scope };
  }
  return undefined;
};
