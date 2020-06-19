import { useState } from "react";

import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

import Input from "../../input";

export default function ChangeTeamName() {
  const { revalidateProfile, teams } = useUser();
  const [scope, setScope] = useScope();
  const [newName, setNewName] = useState(scope.name);
  const handleOnChange = (e) => {
    setNewName(e.target.value);
  };
  const handleOnSubmitName = async (e) => {
    e.preventDefault();
    const url = "/api/team/update/name";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        newName,
        tuid: scope.tuid,
      }),
    });
    if (res.status === 200) {
      revalidateProfile();
      const newScope = await res.json();
      setScope({ ...newScope });
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
