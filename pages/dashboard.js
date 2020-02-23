import { useDrafts, useProfile, useReviews } from "../hooks";
import RequireLogin from "../lib/requireLogin";

function Dashboard() {
  const { drafts } = useDrafts();
  const { reviews } = useReviews();
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
    </>
  );
}

export default () => RequireLogin(Dashboard);
