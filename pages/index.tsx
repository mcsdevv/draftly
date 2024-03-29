// * Modulz
import { Flex, Heading } from "@modulz/radix";

// * Components
import MarketingLayout from "@components/layouts/pages/marketing";

function Landing() {
  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Heading size={2}>Draft your tweets.</Heading>
      <Heading size={2}>Preview your OG images.</Heading>
      <Heading size={2}>Have your team review.</Heading>
      <Heading size={2}>Publish your tweets.</Heading>
      <Heading size={2}>Access your metrics.</Heading>
    </Flex>
  );
}

Landing.getLayout = (page: React.ReactNode) => (
  <MarketingLayout name="Landing">{page}</MarketingLayout>
);

export default Landing;
