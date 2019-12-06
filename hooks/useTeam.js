import useSWR from "swr";

export const useTeam = scope => {
  if (scope !== undefined) {
    const { data: team } = useSWR(`/api/team/details/${scope}`);
    return { ...team, scope };
  }
  return undefined;
};
