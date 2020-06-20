import { useState } from "react";

import useUser from "@hooks/use-user";

import Input from "../../input";

export default function ChangeUserName() {
  const { setUser, user } = useUser();
  const [name, setName] = useState(user?.name);
  const handleOnChange = (e) => {
    setName(e.target.value);
  };
  const handleOnSubmitName = async (e) => {
    e.preventDefault();
    const url = `/api/user/update/name`;
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        name,
      }),
    });
    if (res.status === 200) {
      const newName = await res.text();
      const newUser = { ...user, name: newName };
      console.log("NEW", newUser);
      setUser(newUser);
    }
  };
  return (
    <Input
      buttonDisabled={user && name === user.name}
      buttonText="Update"
      label={"Change Display Name"}
      name="updateName"
      onChange={handleOnChange}
      onSubmit={handleOnSubmitName}
      type="text"
      value={name}
    />
  );
}
