import { useEffect, useState } from "react";

export const useTeamState = teamsList => {
  const [team, setTeamState] = useState(null);
  useEffect(() => {
    function getTeam() {
      if (teamsList.length > 0) {
        setTeamState(teamsList[0]);
      }
    }
    getTeam();
  }, []);
  const setTeam = newTeam => setTeamState(newTeam);
  return { team, setTeam };
};
