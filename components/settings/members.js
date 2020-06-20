import { useState } from "react";

import useScope from "@hooks/use-scope";

import Input from "../input";

export default function Members() {
  const [memberEmail, setMemberEmail] = useState();
  const [scope] = useScope();
  const handleOnChange = (e) => {
    setMemberEmail(e.target.value);
  };
  const handleOnSubmit = async () => {
    const res = await fetch(`/api/team/invite/send/${scope.handle}`, {
      method: "POST",
      body: JSON.stringify({
        code: scope.inviteCode,
        ref: scope.ref,
        team: scope.handle,
        to: memberEmail,
      }),
    });
    if (res.ok) {
      console.log("Invite sent!");
    }
  };
  return (
    <>
      <h3>Add Team Member</h3>
      <Input
        buttonText="Invite"
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
        type="email"
        value={memberEmail}
      />
      <h3>Owners</h3>
      <ul>
        {scope?.owners.map((o) => (
          <li key={o}>{o.name}</li>
        ))}
      </ul>
      <h3>Members</h3>
      <ul>
        {scope?.members.map((o) => (
          <li key={o}>{o.name}</li>
        ))}
      </ul>
    </>
  );
}
