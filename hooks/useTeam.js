import useSWR from "swr";
import { useContext } from "react";
import ScopeContext from "../context/scopeContext";

export const useTeam = () => {
  const { scope } = useContext(ScopeContext);
  const { data: team } = useSWR(
    `/api/team/details/${(scope && scope.name) || "tets"}`
  );
  return { ...team, scope };
};
