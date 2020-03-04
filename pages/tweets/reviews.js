import { useEffect, useState } from "react";
import { useReviews } from "../../hooks";
import React from "react";

import { Box, Grid, Heading } from "@chakra-ui/core";
import CardPlaceholder from "../../components/placeholders/card";
import Comments from "../../components/comments";
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
      return <Heading as="h2">No Reviews...</Heading>;
    }
  };
  return (
    <Grid gridGap="24px" templateColumns="repeat(2, 1fr)" templateRows="600px">
      {reviews && reviews.length > 0
        ? reviews.map(r => (
            <>
              <Box alignSelf="center" justifySelf="center">
                <Review
                  reviews={reviews}
                  revalidate={revalidateReviews}
                  tweet={r}
                />
              </Box>
              <Box
                alignSelf="center"
                justifySelf="center"
                key={r.ref + 1}
                w="100%"
              >
                <Comments
                  comments={r.comments}
                  reviews={reviews}
                  tweetRef={r.ref}
                />
              </Box>
            </>
          ))
        : renderPageState()}
    </Grid>
  );
}

export default () => RequireLogin(Reviews);
