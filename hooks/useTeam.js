import useSWR from "swr";

export const useTeam = scope => {
  console.log("USE TEAM SCOPE", scope);
  if (scope !== undefined) {
    const { data: team } = useSWR(`/api/team/details/${scope}`);
    console.log("TEAM", team);
    return { ...team, scope };
  }
  return undefined;
};
