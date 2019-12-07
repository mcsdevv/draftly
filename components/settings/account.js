import { useContext, useEffect, useState } from "react";
import ScopeContext from "../../context/scopeContext";

import Form from "../form";
import Input from "../input";

export default function Account({ isOwner, isPersonal, scope, team, user }) {
  // TODO Account for the changing of scope to a team
  const { setScope } = useContext(ScopeContext);
  const [account, setAccount] = useState({
    deleteName: null,
    name: "",
    type: "personal",
    updateName: undefined
  });
  useEffect(() => {
    function getAccount() {
      if (isPersonal) {
        user &&
          setAccount({
            deleteName: "",
            name: user.name,
            type: "personal",
            updateName: user.name
          });
      } else {
        team &&
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
    const url = isPersonal
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
      const details = user.scopes.filter(s => s.name === account.name)[0];
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
    const url = isPersonal
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
          label={isPersonal ? "Change Display Name" : "Change Team Name"}
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
