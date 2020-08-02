// * Libraries
import { useState } from "react";

// * Hooks
import useScope from "@hooks/use-scope";

// * Modulz
import {
  Button,
  Container,
  Flex,
  Input,
  List,
  ListItem,
  Subheading,
  Text,
} from "@modulz/radix";

export default function Members() {
  const [memberEmail, setMemberEmail] = useState("");
  const { scope } = useScope();
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMemberEmail(e.currentTarget.value);
  };
  const handleOnSubmit = async () => {
    const res = await fetch(`/api/team/invite/send`, {
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
  // TODO Validate email before sending
  return (
    <>
      <Container mb={4} size={1}>
        <Subheading mb={2}>Invite Team Member</Subheading>
        <Flex mb={2}>
          <Input
            onChange={handleOnChange}
            size={1}
            type="email"
            value={memberEmail}
          />
          <Button
            disabled={memberEmail === ""}
            ml={2}
            onClick={handleOnSubmit}
            size={1}
          >
            Submit
          </Button>
        </Flex>
        <Text sx={{ color: "gray600" }}>
          Enter the email of the person you want to invite.
        </Text>
        <Subheading mb={2} mt={4}>
          Team Owners
        </Subheading>
        <List>
          {scope?.owners.map((o: any) => (
            <ListItem key={o.uid}>
              <Text>- {o.name}</Text>
            </ListItem>
          ))}
        </List>
        <Subheading mb={2}>Team Members</Subheading>
        <List>
          {scope?.members.map((o: any) => (
            <ListItem key={o.uid}>
              <Text>- {o.name}</Text>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}
