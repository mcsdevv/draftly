import { useEffect, useState } from "react";

import { useScope, useProfile } from "../../hooks";
import Cookies from "js-cookie";

import Tabs from "../../components/tabs";
import Form from "../../components/form";
import Input from "../../components/input";

import RequireLogin from "../../lib/requireLogin";

function Account() {
  const { revalidateProfile, teams, user } = useProfile();
  const { scope, setScope } = useScope();
  const [account, setAccount] = useState({
    deleteName: null,
    name: "",
    type: "personal",
    updateName: undefined
  });
  useEffect(() => {
    console.log("updating", scope, teams, user);
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
      {isOwner || (scope && scope.personal) ? (
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
      ) : null}
      <style jsx>{``}</style>
    </>
  );
}

export default () => RequireLogin(Account);
