import { useState } from "react";

import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

import Input from "../../input";

export default function DeleteUser() {
  const { revalidateProfile, teams, user } = useUser();
  const [scope, setScope] = useScope();
  const [userName, setUserName] = useState("");
  const handleOnChange = (e) => {
    setUserName(e.target.value);
  };
  const handleOnSubmitDelete = async (e) => {
    e.preventDefault();
    const url = `/api/user/delete/${scope.handle}`;
    const { status } = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        teams,
      }),
    });
    if (status === 200) {
      revalidateProfile();
      setScope(null);
      //   ! Update scope
      Cookies.remove("id_token");
      Cookies.remove("access_token");
      window.location = "/";
    }
  };
  return (
    <Input
      buttonDisabled={user && userName !== user.name}
      buttonText="Delete"
      label="Delete Account"
      name="deleteName"
      onChange={handleOnChange}
      onSubmit={handleOnSubmitDelete}
      text={"Enter your display name before clicking delete."}
      type="text"
      value={userName}
    />
  );
}
