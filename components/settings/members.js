import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile, useTeamMembers } from "../../hooks";

import Input from "../input";

export default function Members() {
  const { teamMembers } = useTeamMembers();
  const [memberEmail, setMemberEmail] = useState();
  const { user } = useProfile();
  const { scope } = useContext(ScopeContext);
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
  // TODO Create endpoint to get details for all team members
  console.log(teamMembers);
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
            return <li key={o}>{teamMembers.find((t) => t.ref === o).name}</li>;
          })}
      </ul>
      <h3>Members</h3>
      <ul>
        {teamMembers &&
          scope?.members.map((o) => {
            return <li key={o}>{teamMembers.find((t) => t.ref === o).name}</li>;
          })}
      </ul>
    </>
  );
}
