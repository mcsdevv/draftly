import { useEffect, useState } from "react";

import { useScope, useProfile } from "../../hooks";
import Cookies from "js-cookie";

import Form from "../form";
import Input from "../input";

export default function Account() {
  const { revalidateProfile, teams, user } = useProfile();
  const { scope, setScope } = useScope();
  const [account, setAccount] = useState({
    deleteName: null,
    name: "",
    updateName: undefined
  });
  useEffect(() => {
    function getAccount() {
      if (scope && user) {
        setAccount({
          deleteName: "",
          name: scope.name,
          updateName: scope.name
        });
      }
    }
    getAccount();
  }, [scope, teams, user]);
  const handleOnChange = e => {
    const key = e.target.name;
    setAccount({ ...account, [key]: e.target.value });
  };
  const handleOnSubmitName = async e => {
    e.preventDefault();
    const url =
      scope && scope.personal
        ? `/api/user/update/name/${scope.email}`
        : `/api/team/update/name/${scope.handle}`;
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        newName: account.updateName
      })
    });
    if (res.status === 200) {
      revalidateProfile();
      const newScope = await res.json();
      setScope({ ...newScope, personal: scope.personal });
    }
  };
  const handleOnSubmitDelete = async e => {
    e.preventDefault();
    const url =
      scope && scope.personal
        ? `/api/user/delete/${scope.email}`
        : `/api/team/delete/${scope.handle}`;
    const { status } = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        teams
      })
    });
    if (status === 200) {
      // TODO Handle user deletion API...
      revalidateProfile();
      if (scope.personal) {
        setScope(null);
        Cookies.remove("id_token");
        Cookies.remove("access_token");
        localStorage.removeItem("teams");
        localStorage.removeItem("user");
        window.location = "/";
      } else {
        setScope({ ...user, personal: true });
      }
    }
  };
  const isOwner =
    user && scope && scope.owners && scope.owners.includes(user.email);
  return (
    <>
      <Form
        onSubmit={handleOnSubmitName}
        disabled={account.name === account.updateName}
        htmlFor="updateName"
        label={
          scope && scope.personal ? "Change Display Name" : "Change Team Name"
        }
      >
        <Input
          name="updateName"
          onChange={handleOnChange}
          type="text"
          value={account ? account.updateName : ""}
        />
      </Form>
      {isOwner || (scope && scope.personal) ? (
        <Form
          buttonText="Delete"
          disabled={account.name !== account.deleteName}
          helperText={`Enter your ${
            scope && scope.personal ? "display" : "team"
          } name before clicking delete.`}
          htmlFor="deleteName"
          label={scope && scope.personal ? "Delete Account" : "Delete Team"}
          onSubmit={handleOnSubmitDelete}
        >
          <Input
            name="deleteName"
            onChange={handleOnChange}
            onSubmit
            type="text"
            value={account.deleteName || ""}
          />
        </Form>
      ) : null}
    </>
  );
}
