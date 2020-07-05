// * Libraries
import { useState } from "react";
import Cookies from "js-cookie";

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

export default function DeleteUser() {
  const { revalidateProfile, teams, user } = useUser();
  const { scope, setScope } = useScope();
  const [userName, setUserName] = useState("");
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };
  const handleOnSubmitDelete = async () => {
    const url = `/api/user/delete/${scope.handle}`;
    const { status } = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        teams,
      }),
    });
    if (status === 200) {
      revalidateProfile();
      setScope(null);
      Cookies.remove("id_token");
      Cookies.remove("access_token");
      Cookies.remove("uid");
      Cookies.remove("tuid");
      window.location.href = "/";
    }
  };
  return (
    <Container mb={4} size={1}>
      <Subheading mb={2}>Delete Account</Subheading>
      <Flex mb={2}>
        <Input
          name="deleteName"
          onChange={handleOnChange}
          size={1}
          type="text"
          value={userName}
        />
        <Button
          disabled={user && userName !== user.name}
          ml={2}
          onClick={handleOnSubmitDelete}
          size={1}
        >
          Submit
        </Button>
      </Flex>
      <Text sx={{ color: "gray600" }}>
        Enter your display name to confirm deletion.
      </Text>
    </Container>
  );
}
