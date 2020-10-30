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
  const { setScope, scope } = useScope();

  console.log("scope", scope);

  // * Handle downgrading an owner to the member role
  const handleDowngradeMember = (id: string) => {};

  // * Handle on change event for email entry
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMemberEmail(e.currentTarget.value);
  };

  // * Handle submit event for invite by email
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

  // * Handle removing a member or owner from a team
  const handleRemoveMember = async (tmuid: string) => {
    const res = await fetch(`/api/team/member/delete`, {
      method: "POST",
      body: JSON.stringify({
        tmuid,
      }),
    });
    if (res.ok) {
      console.log("Member removed from team.");
      const filteredMembers = scope.members.filter(
        (m: any) => m.tmuid !== tmuid
      );
      const filteredOwners = scope.members.filter(
        (o: any) => o.tmuid !== tmuid
      );
      setScope({ ...scope, members: filteredMembers, owners: filteredOwners });
    }
  };

  // * Handle upgrading an owner to the member role
  const handleUpgradeMember = (id: string) => {};

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
        <MembersTable loading={!scope?.owners} type="owners">
          {scope?.owners.map((o: any) => (
            <MembersRow
              handleDowngradeMember={() => handleDowngradeMember(o.tmuid)}
              handleRemoveMember={() => handleRemoveMember(o.tmuid)}
              key={o.user.name}
              row={[o.user.name, o.user.email]}
              type="owner"
            />
          ))}
        </MembersTable>
        <Subheading mb={2} mt={4}>
          Members
        </Subheading>
        <MembersTable loading={!scope?.members} type="members">
          {scope?.members.map((m: any) => (
            <MembersRow
              handleRemoveMember={() => handleRemoveMember(m.tmuid)}
              handleUpgradeMember={() => handleUpgradeMember(m.tmuid)}
              key={m.user.name}
              row={[m.user.name, m.user.email]}
              type="member"
            />
          ))}
        </MembersTable>
      </Container>
    </>
  );
}
