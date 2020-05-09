import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";

import Input from "../input";

export default function Members() {
  const [memberEmail, setMemberEmail] = useState();
  const { user } = useProfile();
  const { scope } = useContext(ScopeContext);
  const handleOnChange = (e) => {
    setMemberEmail(e.target.value);
  };
  const handleOnSubmit = async () => {
    console.log("submit");
  };
  // TODO Create endpoint to get details for all team members
  return (
    <>
      <h3>Add Team Member</h3>
      <Input
        buttonText="Invite"
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
        value={memberEmail}
      />
      <h3>Owners</h3>
      <ul>
        {scope.owners.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>
      <h3>Members</h3>
      <ul>
        {scope.members.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>
    </>
  );
}
