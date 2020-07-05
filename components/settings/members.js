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
  // TODO Validate email before sending
  return (
    <>
      <Container mb={4} size={1}>
        <Subheading mb={2}>Invite Team Member</Subheading>
        <Flex mb={4}>
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
            Invite
          </Button>
        </Flex>
        <Subheading mb={2}>Team Owners</Subheading>
        <List>
          {scope?.owners.map((o) => (
            <ListItem key={o.uid}>
              <Text>- {o.name}</Text>
            </ListItem>
          ))}
        </List>
        <Subheading mb={2}>Team Members</Subheading>
        <List>
          {scope?.members.map((o) => (
            <ListItem key={o.uid}>
              <Text>- {o.name}</Text>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}
