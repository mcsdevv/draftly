import { useEffect, useState } from "react";
import { useProfile, usePublished } from "../../hooks";

import RequireLogin from "../../lib/requireLogin";

import { Box, Heading } from "@chakra-ui/core";
import CardPlaceholder from "../../components/placeholders/card";
import Grid from "../../components/layout/grid";
import Page from "../../components/page";
import Publish from "../../components/tweets/publish";

function Published() {
  const { user } = useProfile();
  const { published } = usePublished();
  const [showLoading, setShowLoading] = useState(false);
  const [showNoPublished, setShowNoPublished] = useState(false);
  useEffect(() => {
    function getPageState() {
      if (published === undefined) {
        // * Loading page
        setShowLoading(true);
        setShowNoPublished(false);
      }
      if (published && published.length !== 0) {
        // * Reviews present
        setShowLoading(false);
        setShowNoPublished(false);
      }
      if (published && published.length === 0) {
        // * No reviews present
        setShowLoading(false);
        setShowNoPublished(true);
      }
    }
    getPageState();
  }, [published]);
  const renderPageState = () => {
    if (showLoading) {
      // TODO Alternate card placeholder with metrics
      return (
        <>
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
        </>
      );
    }
    if (showNoPublished) {
      return <Heading as="h2">No Published...</Heading>;
    }
  };
  return (
    <Page name="Published">
      <Grid>
        {published
          ? published.map((p) => (
              <>
                <Box alignSelf="center" justifySelf="center" key={p.ref}>
                  <Publish published={published} tweet={p} />
                </Box>
                <Box
                  alignSelf="center"
                  justifySelf="center"
                  key={p.ref + 1}
                  w="100%"
                >
                  Here be metrics...
                </Box>
              </>
            ))
          : renderPageState()}
      </Grid>
    </Page>
  );
}

export default () => RequireLogin(Published);
