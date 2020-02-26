import { useEffect, useState } from "react";
import { useDrafts } from "../../hooks";

import { Box, Grid, Heading } from "@chakra-ui/core";
import ComposeTweet from "../../components/tweets/compose";
import Draft from "../../components/tweets/draft";

import RequireLogin from "../../lib/requireLogin";

function Drafts() {
  const { drafts, isValidating, revalidateDrafts } = useDrafts();
  const [drafting, setDrafting] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showNoDrafts, setShowNoDrafts] = useState(false);
  useEffect(() => {
    function getPageState() {
      if (isValidating && !drafts) {
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
  const startDraft = () => {
    setDrafting(true);
  };
  return (
    <Grid templateColumns="repeat(2, 1fr)" templateRows="700px">
      <Box alignSelf="center" justifySelf="center">
        <ComposeTweet
          drafting={drafting}
          revalidate={revalidateDrafts}
          setDrafting={setDrafting}
          startDraft={startDraft}
        />
      </Box>
      {drafts && drafts.length > 0 ? (
        drafts.map(d => (
          <Box alignSelf="center" justifySelf="center" key={d.ref}>
            <Draft drafts={drafts} revalidate={revalidateDrafts} tweet={d} />
          </Box>
        ))
      ) : (
        <Heading as="h2">
          {showLoading && "Loading drafts..."}
          {showNoDrafts && "No drafts..."}
        </Heading>
      )}
    </Grid>
  );
}

export default () => RequireLogin(Drafts);
