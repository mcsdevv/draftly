import { useEffect, useState } from "react";
import { useDrafts } from "../../hooks";

import { Box, Grid, Heading } from "@chakra-ui/core";
import TweetsTabs from "../../components/tabs/tweets";
import ComposeTweet from "../../components/tweets/compose";
import Draft from "../../components/tweets/draft";

import RequireLogin from "../../lib/requireLogin";

function Drafts() {
  const { drafts, isValidating, revalidateDrafts } = useDrafts();
  const [drafting, setDrafting] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [showNoDrafts, setShowNoDrafts] = useState(false);
  useEffect(() => {
    function getPageState() {
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
    <>
      <TweetsTabs />
      {showNoDrafts && <h1>no drafts</h1>}
      {showLoading && <h1>loading</h1>}
      <Grid templateColumns="repeat(2, 1fr)" templateRows="700px">
        <Box alignSelf="center" justifySelf="center">
          <ComposeTweet
            drafting={drafting}
            revalidate={revalidateDrafts}
            setDrafting={setDrafting}
            startDraft={startDraft}
          />
        </Box>
        {drafts ? (
          drafts.map(d => (
            <Box alignSelf="center" justifySelf="center" key={d.ref}>
              <Draft drafts={drafts} revalidate={revalidateDrafts} tweet={d} />
            </Box>
          ))
        ) : (
          <Heading as="h2">Loading drafts...</Heading>
        )}
      </Grid>
    </>
  );
}

export default () => RequireLogin(Drafts);
