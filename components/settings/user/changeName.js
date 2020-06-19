import { useState } from "react";

import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

import Input from "../../input";

export default function ChangeUserName() {
  const { revalidateProfile, user } = useUser();
  const [scope, setScope] = useScope();
  const [newName, setNewName] = useState(user.name);
  const handleOnChange = (e) => {
    setNewName(e.target.value);
  };
  const handleOnSubmitName = async (e) => {
    e.preventDefault();
    const url = `/api/user/update/name`;
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
