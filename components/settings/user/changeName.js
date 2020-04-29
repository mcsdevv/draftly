import { useState } from "react";

import { useScope, useProfile } from "../../../hooks";

import Input from "../../input";

export default function ChangeUserName() {
  const { revalidateProfile, user } = useProfile();
  const { scope, setScope } = useScope();
  const [newName, setNewName] = useState(scope.name);
  const handleOnChange = (e) => {
    setNewName(e.target.value);
  };
  const handleOnSubmitName = async (e) => {
    e.preventDefault();
    const url = `/api/user/update/name/${scope.handle}`;
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
    }
  };
  return (
    <Input
      buttonDisabled={user && newName === user.name}
      buttonText="Update"
      label={"Change Display Name"}
      name="updateName"
      onChange={handleOnChange}
      onSubmit={handleOnSubmitName}
      type="text"
      value={newName}
    />
  );
}
