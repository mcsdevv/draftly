// * Libraries
import { useRouter } from "next/router";

// * Components
import Error from "@components/layouts/content/error";
import MarketingLayout from "@components/layouts/pages/marketing";

function InviteCodeInvalid() {
  const router = useRouter();
  const team = router.query.team;

  // * Format error text
  const text = `The invite code
  ${team ? `provided to join the ${team} team` : "provided"} has expired,
  please request a new invite from a team owner.`;

  // * Format error title
  const title = "Invite Code Invalid";
  return <Error text={text} title={title} />;
}

InviteCodeInvalid.getLayout = (page: React.ReactNode) => (
  <MarketingLayout name="Error">{page}</MarketingLayout>
);

export default InviteCodeInvalid;
