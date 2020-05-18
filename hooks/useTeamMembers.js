import useSWR from "swr";
import { useScope } from "./";

export const useTeamMembers = () => {
  const { scope } = useScope();
  const { data: teamMembers } = useSWR(
    () => `/api/team/members/${scope.handle}?ref=${scope.ref}`
  );
  return { teamMembers: teamMembers || null };
};
