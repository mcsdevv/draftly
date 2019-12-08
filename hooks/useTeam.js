import useSWR from "swr";
import { useContext } from "react";
import ScopeContext from "../context/scopeContext";

export const useTeam = () => {
  const { scope } = useContext(ScopeContext);
  const { data: team } = useSWR(
    `/api/team/details/${(scope && scope.name) || "tets"}`
  );
  return { team };
};

// yarn add eslint-plugin-react-hooks --dev

// const { scope } = useContext(ScopeContext);
// const { data: team } = useSWR(
//   `/api/team/details/${(scope && scope.name) || "tets"}`
// );
// return { ...team, scope };

// const { scope } = useContext(ScopeContext);
// if (scope && scope.type !== "personal") {
//   const { data: team } = useSWR(`/api/team/details/${scope.name}`);
//   return { ...team, scope };
// }
