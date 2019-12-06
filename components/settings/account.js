import { useEffect, useState } from "react";

import Form from "../form";
import Input from "../input";

export default function Account({ isOwner, isPersonal, team, user }) {
  // TODO Account for the changing of scope to a team
  const [account, setAccount] = useState(team || user);
  useEffect(() => {
    function getAccount() {
      if (isPersonal) {
        user && setAccount({ name: user.name });
      } else {
        team && setAccount({ name: team.name });
      }
    }
    getAccount();
  }, [team, user]);
  const handleOnChange = e => {
    const key = e.target.name;
    setAccount({ ...account, [key]: e.target.value });
  };
  const handleOnSubmitName = async e => {
    e.preventDefault();
    // TODO Make API call to update the user or team
    // updateTeams();
    console.log(account);
  };
  const handleOnSubmitDelete = async e => {
    e.preventDefault();
    const url = isPersonal
      ? `api/user/delete/${user.email}`
      : `api/team/delete/${team.handle}`;
    const res = await fetch(url);
    const der = await res;
    console.log("STATUS", der);
    console.log(account);
  };
  return (
    <>
      <h1>Account Settings</h1>
      <Form onSubmit={handleOnSubmitName}>
        <Input
          label={isPersonal ? "Change Display Name" : "Change Team Name"}
          name="name"
          onChange={handleOnChange}
          type="text"
          value={account ? account.name : ""}
        />
      </Form>
      {isOwner && (
        <Form
          buttonText="Delete"
          disabled={account.name !== account.deleteName}
          onSubmit={handleOnSubmitDelete}
        >
          <Input
            label={isPersonal ? "Delete Account" : "Delete Team"}
            name="deleteName"
            onChange={handleOnChange}
            onSubmit
            text={`Enter your ${
              isPersonal ? "display" : "team"
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
