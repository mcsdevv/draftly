// * Components
import PublishedTweet from "@components/tweets/published";
import DashboardLayout from "@components/layouts/pages/dashboard";

const Published = () => <PublishedTweet />;

Published.getLayout = (page) => (
  <DashboardLayout name="Published Tweet">{page}</DashboardLayout>
);

export default Published;
