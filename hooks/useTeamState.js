import { useEffect, useState } from "react";

export const useTeamState = teamsList => {
  const [team, setTeamState] = useState(undefined);
  useEffect(() => {
    function getTeam() {
      if (teamsList && teamsList.length > 0) {
        setTeamState(teamsList[0]);
      }
    }
    getTeam();
  }, []);
  const setTeam = e => setTeamState(e.target.value);
  return { team, setTeam };
};
