import { useEffect, useState } from "react";

import { useScope } from "../../hooks/useScope";
import { useTeam } from "../../hooks/useTeam";
import { useUser } from "../../hooks/useUser";

import Form from "../form";
import Input from "../input";

export default function Account() {
  // TODO Account for the changing of scope to a team
  const { scope, scopeDetails, setScope } = useScope();
  const team = useTeam();
  const user = useUser();
  const [account, setAccount] = useState({
    deleteName: null,
    name: "",
    type: "personal",
    updateName: undefined
  });
  useEffect(() => {
    // console.log("update");
    function getAccount() {
      // console.log("scope", scope);
      // console.log("scope details", scopeDetails);
      // console.log("user", user);
      // console.log("team", team);
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
  }, [scope, team, user]);
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
    console.log(url);
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        newName: account.updateName
      })
    });
    const { status } = await res;
    if (status === 200) {
      const details = user.scopes.find(s => s.name === account.name);
      setScope({
        name: account.updateName,
        role: details.role,
        type: account.type
      });
    }
    console.log(account);
  };
  const handleOnSubmitDelete = async e => {
    e.preventDefault();
    const url =
      scopeDetails && scopeDetails.personal
        ? `api/user/delete/${user.email}`
        : `api/team/delete/${team.handle}`;
    const res = await fetch(url);
    const { status } = await res;
    if (status === 200) {
      console.log(status);
      // TODO Handle user deletion...
      setScope({ name: user.name, role: "owner", type: "personal" });
    }
  };
  return (
    <>
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
