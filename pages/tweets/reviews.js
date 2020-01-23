import { useEffect, useState } from "react";
import { useReviews } from "../../hooks";

import TweetsTabs from "../../components/tabs/tweets";
import Review from "../../components/tweets/review";

import RequireLogin from "../../lib/requireLogin";

function Reviews() {
  const { reviews, isValidating, revalidateReviews } = useReviews();
  const [showLoading, setShowLoading] = useState(true);
  const [showNoReviews, setShowNoReviews] = useState(false);
  useEffect(() => {
    function getPageState() {
      if (isValidating) {
        // * Loading page
        setShowLoading(false);
        setShowNoReviews(true);
      }
      if (reviews && reviews.length !== 0) {
        // * Reviews present
        setShowLoading(false);
      }
    }
    getPageState();
  }, [reviews]);
  return (
    <>
      <TweetsTabs />
      {showNoReviews && <h1>no drafts</h1>}
      {showLoading && <h1>loading</h1>}
      <div className="draft-list">
        {reviews ? (
          reviews.map(d => (
            <div className="draft-holder" key={d.ref}>
              <Review
                reviews={reviews}
                revalidate={revalidateReviews}
                size="small"
                tweet={d}
              />
            </div>
          ))
        ) : (
          <h2>Loading reviews...</h2>
        )}
      </div>
      <style jsx>{`
        .draft-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: 500px;
        }
        .draft-holder {
          align-self: center;
          justify-self: center;
        }
      `}</style>
    </>
  );
}

export default () => RequireLogin(Reviews);
