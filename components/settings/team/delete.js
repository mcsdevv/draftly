import { useState } from "react";

import { useScope, useProfile } from "../../../hooks";

import { useToast } from "@chakra-ui/core";
import Input from "../../input";

export default function DeleteTeam() {
  const { revalidateProfile, teams } = useProfile();
  const { scope, setScope } = useScope();
  const [teamName, setTeamName] = useState("");
  const toast = useToast();
  const handleOnChange = (e) => {
    setTeamName(e.target.value);
  };
  const handleOnSubmitDelete = async (e) => {
    e.preventDefault();
    const url = `/api/team/delete/${scope.handle}`;
    const { status } = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        teams,
      }),
    });
    if (status === 200) {
      revalidateProfile();
      //   ! Update scope
      setScope({ ...user });
      toast({
        title: "Team deleted.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
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
