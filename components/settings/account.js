import { useEffect, useState } from "react";

import Form from "../form";
import Input from "../input";

export default function Account({
  isOwner,
  scope,
  scopeType,
  teams,
  updateTeams,
  user
}) {
  // TODO Account for the changing of scope to a team
  const [account, setAccount] = useState({});
  useEffect(() => {
    function getAccount() {
      if (scopeType === "personal") {
        user && setAccount({ name: user.name });
      } else {
        teams && teams[scope] && setAccount({ name: teams[scope].name });
      }
    }
    getAccount();
  }, [scope, teams, user]);
  const handleOnChange = e => {
    const key = e.target.name;
    setAccount({ ...account, [key]: e.target.value });
  };
  const handleOnSubmitName = e => {
    e.preventDefault();
    // TODO Make API call to update the user or team
    updateTeams();
    console.log(account);
  };
  const handleOnSubmitDelete = e => {
    e.preventDefault();
    // TODO Make API call to update the user or team
    updateTeams();
    console.log(account);
  };
  return (
    <>
      <h1>Account Settings</h1>
      <Form onSubmit={handleOnSubmitName}>
        <Input
          label={
            scopeType === "personal"
              ? "Change Display Name"
              : "Change Team Name"
          }
          name="name"
          onChange={handleOnChange}
          type="text"
          value={account.name || ""}
        />
      </Form>
      {isOwner && (
        <Form
          buttonText="Delete"
          disabled={account.name !== account.deleteName}
          onSubmit={handleOnSubmitDelete}
        >
          <Input
            label={scopeType === "personal" ? "Delete Account" : "Delete Team"}
            name="deleteName"
            onChange={handleOnChange}
            onSubmit
            text={`Enter your ${
              scopeType === "personal" ? "display" : "team"
            } name before clicking delete.`}
            type="text"
            value={account.deleteName || ""}
          />
        </Form>
      )}
    </>
  );
}
