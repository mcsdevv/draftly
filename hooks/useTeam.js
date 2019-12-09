import useSWR from "swr";
import { useContext } from "react";
import ScopeContext from "../context/scopeContext";

export const useTeam = () => {
  const { scope } = useContext(ScopeContext);
  const { data: team, revalidate } = useSWR(() =>
    scope.type !== "personal"
      ? `/api/team/details/${scope.handle || scope.name}`
      : null
  );
  return { revalidate, team };
};
