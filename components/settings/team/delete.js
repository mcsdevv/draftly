import { useState } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";

import useScope from "@hooks/use-scope";
import useTweets from "@hooks/use-tweets";
import useUser from "@hooks/use-user";

import Input from "../../input";

export default function DeleteTeam() {
  const router = useRouter();
  const [scope, setScope] = useScope();
  const { revalidateTweets, setTweets } = useTweets();
  const { setUser, teams, user } = useUser();
  const [teamName, setTeamName] = useState(scope.name);
  const handleOnChange = (e) => {
    setTeamName(e.target.value);
  };
  const handleOnSubmitDelete = async (e) => {
    e.preventDefault();
    const url = "/api/team/delete";
    const { status } = await fetch(url, {
      method: "DELETE",
    });
    if (status === 200) {
      const filteredTeams = teams.filter((t) => t.tuid !== scope.tuid);
      setUser({ user, teams: filteredTeams });
      setTweets([]);
      if (filteredTeams) {
        setScope(filteredTeams[0]);
        revalidateTweets();
      } else {
        Cookies.remove("tuid");
        setScope(null);
      }
      router.push("/dashboard");
    }
  };
  return (
    <Input
      buttonDisabled={teamName !== scope.name}
      buttonText="Delete"
      label="Delete Team"
      name="deleteName"
      onChange={handleOnChange}
      onSubmit={handleOnSubmitDelete}
      text="Enter your team name before clicking delete."
      type="text"
      value={teamName}
    />
  );
}
