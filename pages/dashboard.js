import useTweets from "@hooks/use-tweets";
import useUser from "@hooks/use-user";

import RequireLogin from "@lib/client/requireLogin";

import DashboardLayout from "@components/layouts/dashboard";

function Dashboard() {
  const { drafts, reviews, published } = useTweets();
  const { user } = useUser();
  return (
    <>
      <h3>Hello {user?.name}, here are some stats for you:</h3>
      <ul>
        <li>{drafts?.length} drafts to complete.</li>
        <li>{reviews?.length} reviews to approve.</li>
        <li>{published?.length} tweets published so far.</li>
      </ul>
    </>
  );
}

Dashboard.getLayout = (page) => (
  <DashboardLayout name="Dashboard">{page}</DashboardLayout>
);

export default Dashboard;
