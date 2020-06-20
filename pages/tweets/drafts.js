import { useEffect, useState } from "react";

import useTweets from "@hooks/use-tweets";

import CardPlaceholder from "@components/placeholders/card";
import ComposeTweet from "@components/compose";
import Draft from "@components/tweets/draft";
import Grid from "@components/layout/grid";
import Page from "@components/page";

import RequireLogin from "@lib/client/requireLogin";

function Drafts() {
  const { drafts, reviews, published, setTweets } = useTweets();
  const [drafting, setDrafting] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showNoDrafts, setShowNoDrafts] = useState(false);
  // useEffect(() => {
  //   function getPageState() {
  //     if (drafts === undefined) {
  //       // * Loading page
  //       setShowLoading(true);
  //       setShowNoDrafts(false);
  //     }
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
      return <h2>No Drafts...</h2>;
    }
  };
  const startDraft = () => {
    setDrafting(true);
  };
  return (
    <Page
      buttonText="Create Draft"
      name="Drafts"
      onClick={() => setDrafting(true)}
    >
      <Grid columns="double">
        {drafting && (
          <ComposeTweet
            drafts={drafts}
            drafting={drafting}
            // revalidate={revalidateDrafts}
            setDrafting={setDrafting}
            startDraft={startDraft}
          />
        )}
        {drafts?.length > 0
          ? drafts.map((d) => (
              <Draft
                drafts={drafts}
                key={d.ref}
                // revalidate={revalidateDrafts}
                published={published}
                reviews={reviews}
                setTweets={setTweets}
                tweet={d}
              />
            ))
          : renderPageState()}
      </Grid>
    </Page>
  );
}

export default () => RequireLogin(Drafts);
