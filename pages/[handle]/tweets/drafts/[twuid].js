// * Components
import DraftTweet from "@components/tweets/draft";
import DashboardLayout from "@components/layouts/dashboard";

const Draft = () => <DraftTweet />;

Draft.getLayout = (page) => (
  <DashboardLayout name="Draft">{page}</DashboardLayout>
);

export default Draft;
