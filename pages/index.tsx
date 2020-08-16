// * Components
import MarketingLayout from "@components/layouts/marketing";

const Landing = () => <h1>Draft & Publish</h1>;

Landing.getLayout = (page: React.ReactNode) => (
  <MarketingLayout name="Landing">{page}</MarketingLayout>
);

export default Landing;
