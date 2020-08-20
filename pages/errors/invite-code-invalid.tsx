// * Libraries
import { useRouter } from "next/router";

// * Modulz
import { Divider, Heading, Text } from "@modulz/radix";

// * Components
import MarketingLayout from "@components/layouts/marketing";

function InviteCodeInvalid() {
  const router = useRouter();
  const team = router.query?.team;
  return (
    <>
      <Heading>Error: Invite Code Invalid</Heading>
      <Divider />
      <Text>
        The invite code{" "}
        {team ? `provided to join the ${team} team` : "provided"} has expired,
        please request a new invite from a team owner.
      </Text>
    </>
  );
}

InviteCodeInvalid.getLayout = (page: React.ReactNode) => (
  <MarketingLayout name="Landing">{page}</MarketingLayout>
);

export default InviteCodeInvalid;
