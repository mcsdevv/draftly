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
  Subheading,
  Text,
} from "@modulz/radix";

// * Components
import MembersTable from "@components/table/members";
import MembersRow from "@components/table/members/row";

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
        team: scope.handle,
        to: memberEmail,
        tuid: scope.tuid,
      }),
    });
    if (res.ok) {
      console.log("Invite sent!");
    }
  };
  console.log("scope", scope);
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
          Owners
        </Subheading>
        {/* <List>
          {scope?.owners.map((o: any) => (
            <ListItem key={o.uid}>
              <Text>
                - {o.user.name} ({o.user.email})
              </Text>
            </ListItem>
          ))}
        </List> */}
        <MembersTable loading={!scope?.owners} type="owners">
          {scope?.owners.map((o: any) => (
            <MembersRow
              handleDowngradeMember={() => handleDowngradeMember(d.uid)}
              handleRemoveMember={() => handleRemoveMember(d.uid)}
              key={o.user.name}
              row={[o.user.name, o.user.email]}
              type="owner"
            />
          ))}
        </MembersTable>
        <Subheading mb={2} mt={4}>
          Members
        </Subheading>
        <MembersTable loading={!scope?.owners} type="owners">
          {scope?.members.map((o: any) => (
            <MembersRow
              handleRemoveMember={() => handleRemoveMember(d.uid)}
              handleUpgradeMember={() => handleUpgradeMember(d.uid)}
              key={o.user.name}
              row={[o.user.name, o.user.email]}
              type="owner"
            />
          ))}
        </MembersTable>
      </Container>
    </>
  );
}
