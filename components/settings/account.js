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
  const handleOnSubmitName = async e => {
    e.preventDefault();
    // TODO Make API call to update the user or team
    updateTeams();
    console.log(account);
  };
  const handleOnSubmitDelete = async e => {
    e.preventDefault();
    const url =
      scopeType === "personal"
        ? `api/user/delete/${user.email}`
        : `api/team/delete/${teams[scope].handle}`;
    const res = await fetch(url);
    const { status } = await res;
    console.log("STATUS", status);
    // TODO Make API call to update the user or team
    updateTeams("delete");
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
      <style jsx>{``}</style>
    </>
  );
}
