import { useDrafts, useProfile, useReviews, usePublished } from "../hooks";

import RequireLogin from "../lib/requireLogin";

import Page from "../components/page";

function Dashboard() {
  const { drafts } = useDrafts();
  const { reviews } = useReviews();
  const { published } = usePublished();
  const { user } = useProfile();
  return (
    <Page>
      <h3>Hello {user?.name}, the following items need your attention:</h3>
      <ul>
        <li>{drafts?.length} drafts to complete.</li>
        <li>{reviews?.length} reviews to complete.</li>
      </ul>
      You've published a total of {published?.length} tweets.
    </Page>
  );
}

export default () => RequireLogin(Dashboard);
