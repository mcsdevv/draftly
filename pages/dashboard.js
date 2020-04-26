import { useDrafts, useProfile, useReviews, usePublished } from "../hooks";

import RequireLogin from "../lib/requireLogin";

import Page from "../components/page";

function Dashboard() {
  const { drafts } = useDrafts();
  const { reviews } = useReviews();
  const { published } = usePublished();
  const { user } = useProfile();
  return (
    <Page name="Dashboard">
      <h3>Hello {user?.name}, here are some stats:</h3>
      <ul>
        <li>{drafts?.length} drafts to complete.</li>
        <li>{reviews?.length} reviews to complete.</li>
        <li>{published?.length} tweets published so far.</li>
      </ul>
    </Page>
  );
}

export default () => RequireLogin(Dashboard);
