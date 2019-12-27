import { useEffect, useState } from "react";

import Tabs from "../../components/tabs";
import Form from "../../components/form";
import Input from "../../components/input";

import RequireLogin from "../../lib/requireLogin";

function Reviews({
  revalidateTeam,
  scope,
  scopeDetails,
  setScope,
  team,
  user
}) {
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
  const handleOnSubmitReviews = async e => {
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
  return (
    <>
      <Tabs />
      <h1>Review Settings</h1>
      <Form
        onSubmit={handleOnSubmitReviews}
        disabled={account.name === account.updateName}
      >
        <Input
          label="Reviews Required to Publish"
          max={3}
          min={0}
          name="updateName"
          onChange={handleOnChange}
          type="number"
          value={account ? account.updateName : ""}
        />
      </Form>
      <style jsx>{``}</style>
    </>
  );
}

export default () => RequireLogin(Reviews);
