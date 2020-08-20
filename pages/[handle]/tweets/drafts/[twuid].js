// * Components
import DraftTweet from "@components/tweets/draft";
import DashboardLayout from "@components/layouts/pages/dashboard";

const Draft = () => <DraftTweet />;

Draft.getLayout = (page) => (
  <DashboardLayout name="Draft Tweet">{page}</DashboardLayout>
);

export default Draft;
