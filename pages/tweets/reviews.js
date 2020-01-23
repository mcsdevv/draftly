import { useEffect, useState } from "react";
import { useDrafts, useReviews } from "../../hooks";

import TweetsTabs from "../../components/tabs/tweets";
import ComposeTweet from "../../components/tweets/compose";
import Draft from "../../components/tweets/draft";

import RequireLogin from "../../lib/requireLogin";

function Reviews() {
  const { reviews, revalidateReviews } = useReviews();
  console.log("reviews", reviews);
  const [showLoading, setShowLoading] = useState(true);
  const [showNoReviews, setShowNoReviews] = useState(false);
  // useEffect(() => {
  //   function getPageState() {
  //     if (!isValidating && !drafting && drafts && drafts.length === 0) {
  //       // * No drafts to show
  //       setShowNoDrafts(true);
  //       setShowLoading(false);
  //     }
  //     if ((drafts && drafts.length !== 0) || drafting) {
  //       // * Drafts present or drafting currently
  //       setShowNoDrafts(false);
  //       setShowLoading(false);
  //     }
  //   }
  //   getPageState();
  // }, [drafts, drafting]);
  return (
    <>
      <TweetsTabs />
      {showNoReviews && <h1>no drafts</h1>}
      {showLoading && <h1>loading</h1>}
      <div className="draft-list">
        {reviews ? (
          reviews.map(d => (
            <div className="draft-holder" key={d.ref}>
              <Draft
                drafts={reviews}
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
