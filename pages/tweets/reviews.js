import { useEffect, useState } from "react";
import { useReviews } from "../../hooks";

import TweetsTabs from "../../components/tabs/tweets";
import Review from "../../components/tweets/review";
import Comments from "../../components/tweets/comments";

import RequireLogin from "../../lib/requireLogin";

function Reviews() {
  const { reviews, isValidating, revalidateReviews } = useReviews();
  const [showLoading, setShowLoading] = useState(true);
  const [showNoReviews, setShowNoReviews] = useState(false);
  useEffect(() => {
    function getPageState() {
      if (isValidating) {
        // * Loading page
        setShowLoading(true);
        setShowNoReviews(false);
      }
      if (reviews && reviews.length !== 0) {
        // * Reviews present
        setShowLoading(false);
      }
      if (reviews && reviews.length === 0) {
        // * No reviews present
        setShowLoading(false);
        setShowNoReviews(true);
      }
    }
    getPageState();
  }, [isValidating, reviews]);
  return (
    <>
      <TweetsTabs />
      {showNoReviews && <h1>no reviews</h1>}
      {showLoading && <h1>loading</h1>}
      <div className="draft-list">
        {reviews ? (
          reviews.map(r => (
            <>
              <div className="draft-holder" key={r.ref}>
                <Review
                  reviews={reviews}
                  revalidate={revalidateReviews}
                  size="small"
                  tweet={r}
                />
              </div>
              <div className="draft-holder" key={r.ref + 1}>
                <Comments
                  comments={r.comments}
                  reviews={reviews}
                  tweetRef={r.ref}
                />
              </div>
            </>
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
