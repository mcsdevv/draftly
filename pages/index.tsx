// * Modulz
import { Heading } from "@modulz/radix";

// * Components
import MarketingLayout from "@components/layouts/pages/marketing";

function Landing() {
  return (
    <>
      <Heading size={2}>Draft your tweets.</Heading>
      <Heading size={2}>Preview your OG images.</Heading>
      <Heading size={2}>Have your team review.</Heading>
      <Heading size={2}>Publish your tweets.</Heading>
      <Heading size={2}>Access your metrics.</Heading>
    </>
  );
}

Landing.getLayout = (page: React.ReactNode) => (
  <MarketingLayout name="Landing">{page}</MarketingLayout>
);

export default Landing;
