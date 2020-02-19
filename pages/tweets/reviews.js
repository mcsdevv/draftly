import { useEffect, useState } from "react";
import { useReviews } from "../../hooks";

import { Box, Grid, Heading } from "@chakra-ui/core";
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
      {showNoReviews && <h1>no reviews</h1>}
      {showLoading && <h1>loading</h1>}
      {reviews ? (
        reviews.map(r => (
          <Grid
            key={r.ref}
            templateColumns="repeat(2, 1fr)"
            templateRows="700px"
          >
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
          </Grid>
        ))
      ) : (
        <Heading as="h2">Loading reviews...</Heading>
      )}
    </>
  );
}

export default () => RequireLogin(Reviews);
