import { useEffect, useState } from "react";

import useTweets from "@hooks/use-tweets";

import RequireLogin from "@lib/client/requireLogin";

import CardPlaceholder from "@components/placeholders/card";
import Grid from "@components/layout/grid";
import DashboardLayout from "@components/layouts/dashboard";
import Publish from "@components/tweets/publish";

function Published() {
  const { published } = useTweets();
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
      return <h2>No Published...</h2>;
    }
  };
  return (
    <Grid columns="single">
      {published
        ? published.map((p) => (
            <>
              <Publish key={p.twuid} published={published} tweet={p} />
              <h2 key={p.twuid + 1}>Here be metrics...</h2>
            </>
          ))
        : renderPageState()}
    </Grid>
  );
}

Published.getLayout = (page) => (
  <DashboardLayout name="Published">{page}</DashboardLayout>
);

export default Published;
