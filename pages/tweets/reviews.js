import { useEffect, useState } from "react";
import { useReviews } from "../../hooks";
import React from "react";

import CardPlaceholder from "../../components/placeholders/card";
import Comments from "../../components/comments";
import Grid from "../../components/layout/grid";
import Page from "../../components/page";
import Review from "../../components/tweets/review";

import RequireLogin from "../../lib/requireLogin";

function Reviews() {
  const { reviews, isValidating, revalidateReviews } = useReviews();
  const [showLoading, setShowLoading] = useState(false);
  const [showNoReviews, setShowNoReviews] = useState(false);
  useEffect(() => {
    function getPageState() {
      if (reviews === undefined) {
        // * Loading page
        setShowLoading(true);
        setShowNoReviews(false);
      }
      if (reviews && reviews.length !== 0) {
        // * Reviews present
        setShowLoading(false);
        setShowNoReviews(false);
      }
      if (reviews && reviews.length === 0) {
        // * No reviews present
        setShowLoading(false);
        setShowNoReviews(true);
      }
    }
    getPageState();
  }, [isValidating, reviews]);
  const renderPageState = () => {
    if (showLoading) {
      // TODO Alternate card placeholder with comments
      return (
        <>
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
        </>
      );
    }
    if (showNoReviews) {
      return <h2>No Reviews...</h2>;
    }
  };
  return (
    <Page name="Reviews">
      <Grid>
        {reviews?.length > 0
          ? reviews.map((r) => (
              <>
                <Review
                  reviews={reviews}
                  revalidate={revalidateReviews}
                  tweet={r}
                />
                <Comments
                  comments={r.comments}
                  reviews={reviews}
                  tweetRef={r.ref}
                />
              </>
            ))
          : renderPageState()}
      </Grid>
    </Page>
  );
}

export default () => RequireLogin(Reviews);
