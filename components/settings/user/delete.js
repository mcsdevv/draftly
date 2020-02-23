import { useState } from "react";

import { useScope, useProfile } from "../../../hooks";

import Form from "../../form";
import Input from "../../input";

export default function DeleteUser() {
  const { revalidateProfile, teams, user } = useProfile();
  const { scope, setScope } = useScope();
  const [userName, setUserName] = useState("");
  const handleOnChange = e => {
    setUserName(e.target.value);
  };
  const handleOnSubmitDelete = async e => {
    e.preventDefault();
    const url = `/api/user/delete/${scope.handle}`;
    const { status } = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        teams
      })
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
    <>
      <Form
        buttonText="Delete"
        disabled={user && userName !== user.name}
        helperText={"Enter your display name before clicking delete."}
        htmlFor="deleteName"
        label={"Delete Account"}
        onSubmit={handleOnSubmitDelete}
      >
        <Input
          name="deleteName"
          onChange={handleOnChange}
          onSubmit
          type="text"
          value={userName}
        />
      </Form>
    </>
  );
}
