import { useEffect, useState } from "react";

import { useScope, useUser } from "../../hooks";

import Tabs from "../../components/tabs";
import Form from "../../components/form";
import Input from "../../components/input";

export default function Account({}) {
  const { teams, user } = useUser();
  const { scope, setScope } = useScope();
  const [account, setAccount] = useState({
    deleteName: null,
    name: "",
    type: "personal",
    updateName: undefined
  });
  useEffect(() => {
    function getAccount() {
      if (scope && user) {
        const isPersonal = user.name === name;
        setAccount({
          deleteName: "",
          name: scope.name,
          type: isPersonal ? "personal" : "team",
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
        ? `api/user/update/name/${user.email}`
        : `api/team/update/name/${team.handle}`;
    const { status } = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        newName: account.updateName
      })
    });
    if (status === 200) {
      // TODO Handle user update...
      revalidateTeam();
    }
  };
  const handleOnSubmitDelete = async e => {
    e.preventDefault();
    const url =
      scope && scope.personal
        ? `api/user/delete/${user.email}`
        : `api/team/delete/${team.handle}`;
    const { status } = await fetch(url);
    if (status === 200) {
      // TODO Handle user deletion...
      setScope({ name: user.name, role: "owner", type: "personal" });
    }
  };
  const isOwner = scope && scope.owners && scope.owners.includes(user.email);
  return (
    <>
      <Tabs />
      <h1>Account Settings</h1>
      <Form
        onSubmit={handleOnSubmitName}
        disabled={account.name === account.updateName}
      >
        <Input
          label={
            scope && scope.personal ? "Change Display Name" : "Change Team Name"
          }
          name="updateName"
          onChange={handleOnChange}
          type="text"
          value={account ? account.updateName : ""}
        />
      </Form>
      {isOwner && (
        <Form
          buttonText="Delete"
          disabled={account.name !== account.deleteName}
          onSubmit={handleOnSubmitDelete}
        >
          <Input
            label={scope && scope.personal ? "Delete Account" : "Delete Team"}
            name="deleteName"
            onChange={handleOnChange}
            onSubmit
            text={`Enter your ${
              scope && scope.personal ? "display" : "team"
            } name before clicking delete.`}
            type="text"
            value={account.deleteName || ""}
          />
        </Form>
      )}
      <style jsx>{``}</style>
    </>
  );
}
