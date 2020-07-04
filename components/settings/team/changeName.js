// * Libraries
import { useState } from "react";

// * Hooks
import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

// * Modulz
import { Input } from "@modulz/radix";

export default function ChangeTeamName() {
  const { revalidateProfile } = useUser();
  const { scope, setScope } = useScope();
  const [name, setName] = useState(scope?.name);
  const handleOnChange = (e) => {
    setName(e.target.value);
  };
  const handleOnSubmitName = async (e) => {
    e.preventDefault();
    const url = "/api/team/update/name";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        name,
      }),
    });
    if (res.status === 200) {
      revalidateProfile();
      setScope({ ...scope, name });
    }
  };
  return (
    <Input
      buttonDisabled={name === scope.name}
      buttonText="Update"
      label="Change Team Name"
      name="updateName"
      onChange={handleOnChange}
      onSubmit={handleOnSubmitName}
      type="text"
      value={name}
    />
  );
}
