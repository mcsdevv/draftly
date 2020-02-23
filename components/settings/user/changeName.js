import { useState } from "react";

import { useScope, useProfile } from "../../../hooks";

import { useToast } from "@chakra-ui/core";
import Form from "../../form";
import Input from "../../input";

export default function ChangeUserName() {
  const { revalidateProfile, user } = useProfile();
  const { scope, setScope } = useScope();
  const [newName, setNewName] = useState(scope.name);
  const toast = useToast();
  const handleOnChange = e => {
    setNewName(e.target.value);
  };
  const handleOnSubmitName = async e => {
    e.preventDefault();
    const url = `/api/user/update/name/${scope.handle}`;
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        newName
      })
    });
    if (res.status === 200) {
      revalidateProfile();
      const newScope = await res.json();
      setScope({ ...newScope });
      toast({
        title: "Display name updated.",
        status: "success",
        duration: 9000,
        isClosable: true
      });
    }
  };
  return (
    <>
      <Form
        onSubmit={handleOnSubmitName}
        disabled={user && newName === user.name}
        htmlFor="updateName"
        label={"Change Display Name"}
      >
        <Input
          name="updateName"
          onChange={handleOnChange}
          type="text"
          value={newName}
        />
      </Form>
    </>
  );
}
