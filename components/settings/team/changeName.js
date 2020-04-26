import { useState } from "react";

import { useScope, useProfile } from "../../../hooks";

import { useToast } from "@chakra-ui/core";
import Input from "../../input";

export default function ChangeTeamName() {
  const { revalidateProfile, teams } = useProfile();
  const { scope, setScope } = useScope();
  const [newName, setNewName] = useState(scope.name);
  const toast = useToast();
  const handleOnChange = (e) => {
    setNewName(e.target.value);
  };
  const handleOnSubmitName = async (e) => {
    e.preventDefault();
    const url = `/api/team/update/name/${scope.handle}`;
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        newName,
      }),
    });
    if (res.status === 200) {
      revalidateProfile();
      const newScope = await res.json();
      setScope({ ...newScope });
      toast({
        title: "Team name updated.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Input
      buttonDisabled={newName === scope.name}
      buttonText="Update"
      label="Change Team Name"
      name="updateName"
      onChange={handleOnChange}
      onSubmit={handleOnSubmitName}
      type="text"
      value={newName}
    />
  );
}
