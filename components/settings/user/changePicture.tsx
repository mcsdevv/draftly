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

export default function ChangeUserPicture() {
  const { setUser, teams, user } = useUser();
  const [picture, setPicture] = useState(user?.picture);

  // * Updates the value for the new picture
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPicture(e.currentTarget.value);
  };

  // * Confirms the change with the API
  const handleOnSubmitPicture = async () => {
    const url = "/api/user/update/picture";
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        picture,
      }),
    });
    if (res.status === 200) {
      setUser({ teams, user: { ...user, picture } });
    }
  };

  return (
    <Container mb={4} size={1}>
      <Subheading mb={2}>Change Picture</Subheading>
      <Flex mb={2}>
        <Input
          name="updatePicture"
          onChange={handleOnChange}
          size={1}
          type="text"
          value={picture}
        />
        <Button
          sx={{ cursor: "pointer", width: 100 }}
          disabled={user?.picture === picture}
          ml={2}
          onClick={handleOnSubmitPicture}
          size={1}
          variant="blue"
        >
          Submit
        </Button>
      </Flex>
      <Text sx={{ color: "gray600" }}>Enter a new picture URL.</Text>
    </Container>
  );
}
