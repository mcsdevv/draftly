import { useEffect, useState } from "react";
import { useDrafts } from "../../hooks";

import { Box, Grid, Heading } from "@chakra-ui/core";
import CardPlaceholder from "../../components/placeholders/card";
import ComposeTweet from "../../components/compose";
import Draft from "../../components/tweets/draft";
import Page from "../../components/page";

import RequireLogin from "../../lib/requireLogin";

function Drafts() {
  const { drafts, isValidating, revalidateDrafts } = useDrafts();
  const [drafting, setDrafting] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showNoDrafts, setShowNoDrafts] = useState(false);
  useEffect(() => {
    function getPageState() {
      if (drafts === undefined) {
        // * Loading page
        setShowLoading(true);
        setShowNoDrafts(false);
      }
      if (!isValidating && !drafting && drafts && drafts.length === 0) {
        // * No drafts to show
        setShowNoDrafts(true);
        setShowLoading(false);
      }
      if ((drafts && drafts.length !== 0) || drafting) {
        // * Drafts present or drafting currently
        setShowNoDrafts(false);
        setShowLoading(false);
      }
    }
    getPageState();
  }, [drafts, drafting]);
  const renderPageState = () => {
    if (showLoading) {
      return (
        <>
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
        </>
      );
    }
    if (showNoDrafts) {
      return <Heading as="h2">No Drafts...</Heading>;
    }
  };
  const startDraft = () => {
    setDrafting(true);
  };
  return (
    <Page>
      <Grid
        gridGap="24px"
        templateColumns="repeat(2, 1fr)"
        templateRows="600px"
      >
        <Box alignSelf="center" justifySelf="center">
          <ComposeTweet
            drafting={drafting}
            revalidate={revalidateDrafts}
            setDrafting={setDrafting}
            startDraft={startDraft}
          />
        </Box>
        {drafts && drafts.length > 0
          ? drafts.map(d => (
              <Box alignSelf="center" justifySelf="center" key={d.ref}>
                <Draft
                  drafts={drafts}
                  revalidate={revalidateDrafts}
                  tweet={d}
                />
              </Box>
            ))
          : renderPageState()}
      </Grid>
    </Page>
  );
}

export default () => RequireLogin(Drafts);
