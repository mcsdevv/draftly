// * Libraries
import { useRouter } from "next/router";

// * Modulz
import { Container, Divider, Heading, Text } from "@modulz/radix";

// * Components
import MarketingLayout from "@components/layouts/marketing";

function InviteCodeInvalid() {
  const router = useRouter();
  const team = router.query?.team;
  return (
    <Container size={1}>
      <Heading as="h1" mb={2} mt={4} size={4}>
        Invite Code Invalid
      </Heading>
      <Divider mb={2} />
      <Text>
        The invite code{" "}
        {team ? `provided to join the ${team} team` : "provided"} has expired,
        please request a new invite from a team owner.
      </Text>
    </Container>
  );
}

InviteCodeInvalid.getLayout = (page: React.ReactNode) => (
  <MarketingLayout name="Error">{page}</MarketingLayout>
);

export default InviteCodeInvalid;
