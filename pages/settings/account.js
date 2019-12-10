import { useEffect, useState } from "react";

import { useScope, useTeam, useUser } from "../../hooks";

import Tabs from "../../components/tabs";
import Form from "../../components/form";
import Input from "../../components/input";

export default function Account({}) {
  const { user } = useUser();
  const { scope, scopeDetails, setScope } = useScope();
  const { revalidate: revalidateTeam, team } = useTeam();
  const [account, setAccount] = useState({
    deleteName: null,
    name: "",
    type: "personal",
    updateName: undefined
  });
  useEffect(() => {
    function getAccount() {
      if (scopeDetails && scopeDetails.personal && user) {
        setAccount({
          deleteName: "",
          name: user.name,
          type: "personal",
          updateName: user.name
        });
      }
      if (scopeDetails && !scopeDetails.personal && team) {
        setAccount({
          deleteName: "",
          name: team.name,
          type: "team",
          updateName: team.name
        });
      }
    }
    getAccount();
  }, [scope, scopeDetails, team, user]);
  const handleOnChange = e => {
    const key = e.target.name;
    setAccount({ ...account, [key]: e.target.value });
  };
  const handleOnSubmitName = async e => {
    e.preventDefault();
    const url =
      scopeDetails && scopeDetails.personal
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
      scopeDetails && scopeDetails.personal
        ? `api/user/delete/${user.email}`
        : `api/team/delete/${team.handle}`;
    const { status } = await fetch(url);
    if (status === 200) {
      // TODO Handle user deletion...
      setScope({ name: user.name, role: "owner", type: "personal" });
    }
  };
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
            scopeDetails && scopeDetails.personal
              ? "Change Display Name"
              : "Change Team Name"
          }
          name="updateName"
          onChange={handleOnChange}
          type="text"
          value={account ? account.updateName : ""}
        />
      </Form>
      {scopeDetails && scopeDetails.role === "owner" && (
        <Form
          buttonText="Delete"
          disabled={account.name !== account.deleteName}
          onSubmit={handleOnSubmitDelete}
        >
          <Input
            label={
              scopeDetails && scopeDetails.personal
                ? "Delete Account"
                : "Delete Team"
            }
            name="deleteName"
            onChange={handleOnChange}
            onSubmit
            text={`Enter your ${
              scopeDetails && scopeDetails.personal ? "display" : "team"
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
