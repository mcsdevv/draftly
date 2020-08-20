// * Components
import MarketingLayout from "@components/layouts/pages/marketing";

function Landing() {
  return <h1>Draft & Publish</h1>;
}

Landing.getLayout = (page: React.ReactNode) => (
  <MarketingLayout name="Landing">{page}</MarketingLayout>
);

export default Landing;
