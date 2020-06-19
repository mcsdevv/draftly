import { useState } from "react";

import { useScope, useUser } from "../../../hooks";

import Input from "../../input";

export default function DeleteTeam() {
  const { revalidateProfile, teams } = useUser();
  const [scope, setScope] = useScope();
  const [teamName, setTeamName] = useState(scope.name);
  const handleOnChange = (e) => {
    setTeamName(e.target.value);
  };
  const handleOnSubmitDelete = async (e) => {
    e.preventDefault();
    const url = "/api/team/delete";
    const { status } = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        tuid: scope.tuid,
      }),
    });
    if (status === 200) {
      // TODO Must mutate
      revalidateProfile();
      //   ! Update scope
      // * If no teams, take to /create
      setScope({ ...user });
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
