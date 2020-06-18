import { useState } from "react";
import { useScope } from "../../hooks";

import Input from "../input";

export default function Members() {
  // TODO Fix
  const teamMembers = [];
  const [memberEmail, setMemberEmail] = useState();
  const { scope } = useScope();
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
        {teamMembers &&
          scope?.owners.map((o) => {
            return (
              <li key={o}>{teamMembers?.find((t) => t.ref === o).name}</li>
            );
          })}
      </ul>
      <h3>Members</h3>
      <ul>
        {teamMembers &&
          scope?.members.map((o) => {
            return (
              <li key={o}>{teamMembers?.find((t) => t.ref === o).name}</li>
            );
          })}
      </ul>
    </>
  );
}
