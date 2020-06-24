import { useEffect, useState } from "react";

import useTweets from "@hooks/use-tweets";

import CardPlaceholder from "@components/placeholders/card";
import Comments from "@components/comments";
import Grid from "@components/layout/grid";
import Page from "@components/page";
import Review from "@components/tweets/review";

import RequireLogin from "@lib/client/requireLogin";

function Reviews() {
  const { reviews } = useTweets();
  const [showLoading, setShowLoading] = useState(false);
  const [showNoReviews, setShowNoReviews] = useState(false);
  // useEffect(() => {
  //   function getPageState() {
  //     if (reviews === undefined) {
  //       // * Loading page
  //       setShowLoading(true);
  //       setShowNoReviews(false);
  //     }
  //     if (reviews && reviews.length !== 0) {
  //       // * Reviews present
  //       setShowLoading(false);
  //       setShowNoReviews(false);
  //     }
  //     if (reviews && reviews.length === 0) {
  //       // * No reviews present
  //       setShowLoading(false);
  //       setShowNoReviews(true);
  //     }
  //   }
  //   getPageState();
  // }, [isValidating, reviews]);
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
      <Grid columns="single">
        {reviews?.length > 0
          ? reviews.map((r) => (
              <>
                <Review tweet={r} />
                <Comments comments={r.comments} twuid={r.twuid} />
              </>
            ))
          : renderPageState()}
      </Grid>
    </Page>
  );
}

export default Reviews;
