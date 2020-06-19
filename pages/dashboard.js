import useTweets from "@hooks/use-tweets";
import useUser from "@hooks/use-user";

import RequireLogin from "@lib/client/requireLogin";

import Page from "../components/page";

function Dashboard() {
  const { drafts, reviews, published } = useTweets();
  const { user } = useUser();
  return (
    <Page name="Dashboard">
      <h3>Hello {user?.name}, here are some stats for you:</h3>
      <ul>
        <li>{drafts?.length} drafts to complete.</li>
        <li>{reviews?.length} reviews to complete.</li>
        <li>{published?.length} tweets published so far.</li>
      </ul>
    </Page>
  );
}

export default () => RequireLogin(Dashboard);
