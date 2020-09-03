// * Libraries
import { useEffect, useState } from "react";

// * Hooks
import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

// * Modulz
import {
  Button,
  Container,
  Flex,
  Input,
  Subheading,
  Text,
} from "@modulz/radix";

export default function ChangeTeamName() {
  const { setUser } = useUser();
  const { scope, setScope } = useScope();
  const [name, setName] = useState(scope?.name);

  useEffect(() => {
    function getScopeName() {
      setName(scope.name);
    }
    getScopeName();
  }, [scope]);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const handleOnSubmitName = async () => {
    const url = "/api/team/update/name";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        name,
      }),
    });
    if (res.status === 200) {
      setUser();
      setScope({ ...scope, name });
    }
  };
  return (
    <Container mb={4} size={1}>
      <Subheading mb={2}>Change Team Name</Subheading>
      <Flex mb={2}>
        <Input
          name="updateName"
          onChange={handleOnChange}
          size={1}
          type="text"
          value={name}
        />
        <Button
          disabled={name === scope.name}
          ml={2}
          onClick={handleOnSubmitName}
          size={1}
        >
          Submit
        </Button>
      </Flex>
      <Text sx={{ color: "gray600" }}>Enter a new team display name.</Text>
    </Container>
  );
}
