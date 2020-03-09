import { useDrafts, useProfile, useReviews, usePublished } from "../hooks";
import RequireLogin from "../lib/requireLogin";

function Dashboard() {
  const { drafts } = useDrafts();
  const { reviews } = useReviews();
  const { published } = usePublished();
  const { user } = useProfile();
  return (
    <>
      <h3>
        Hello {user && user.name}, the following items need your attention:
      </h3>
      {drafts && reviews && user && (
        <ul>
          <li>{drafts.length} drafts to complete.</li>
          <li>{reviews.length} reviews to complete.</li>
        </ul>
      )}
      You've published a total of {published?.length} tweets!
    </>
  );
}

export default () => RequireLogin(Dashboard);
