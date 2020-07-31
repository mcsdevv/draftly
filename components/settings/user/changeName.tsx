// * Libraries
import { useState } from "react";

// * Hooks
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

export default function ChangeUserName() {
  const { setUser, user } = useUser();
  const [name, setName] = useState(user?.name);
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const handleOnSubmitName = async () => {
    const url = "/api/user/update/name";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        name,
      }),
    });
    if (res.status === 200) {
      setUser({ user: { ...user, name } });
    }
  };
  return (
    <Container mb={4} size={1}>
      <Subheading mb={2}>Change Display Name</Subheading>
      <Flex mb={2}>
        <Input
          name="updateName"
          onChange={handleOnChange}
          size={1}
          type="text"
          value={name}
        />
        <Button
          disabled={user?.name === name}
          ml={2}
          onClick={handleOnSubmitName}
          size={1}
        >
          Submit
        </Button>
      </Flex>
      <Text sx={{ color: "gray600" }}>Enter a new user display name.</Text>
    </Container>
  );
}