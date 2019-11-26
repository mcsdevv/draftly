import { useTeamState } from "../../hooks/useTeamState";

export default function TeamPicker({ teamsList }) {
  const { team, setTeam } = useTeamState(teamsList);
  return (
    <select value={team} onChange={setTeam}>
      {teamsList &&
        teamsList.map(t => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
    </select>
  );
}
