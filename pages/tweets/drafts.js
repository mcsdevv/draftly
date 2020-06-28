import { useEffect, useState } from "react";
import ago from "s-ago";

import useScope from "@hooks/use-scope";
import useTweets from "@hooks/use-tweets";

import CardPlaceholder from "@components/placeholders/card";
import ComposeTweet from "@components/compose";
import Draft from "@components/tweets/draft";
import Grid from "@components/layout/grid";
import Table from "@components/table";
import Row from "@components/table/row";
import DashboardLayout from "@components/layouts/dashboard";

function Drafts() {
  const [scope] = useScope();
  const { drafts, reviews, published, setTweets } = useTweets();
  const [drafting, setDrafting] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showNoDrafts, setShowNoDrafts] = useState(false);
  const setDraft = () => setDrafting(true);
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
  console.log(scope);
  return (
    <Table headers={["Text", "Created By", "Created At", "Last Updated"]}>
      {drafts?.map((d) => (
        <Row
          key={d.twuid}
          row={[
            d.text,
            [...scope?.members, ...scope?.owners].find(
              (m) => m.uid === d.created_by
            )?.name,
            ago(new Date(d.created_at)),
            ago(new Date(d.updated_at)),
          ]}
        />
      ))}
    </Table>
  );
}

Drafts.getLayout = (page) => (
  <DashboardLayout name="Drafts">{page}</DashboardLayout>
);

export default Drafts;

// return (
//   <Grid columns="double">
//     {drafting && (
//       <ComposeTweet
//         drafts={drafts}
//         drafting={drafting}
//         // revalidate={revalidateDrafts}
//         setDrafting={setDrafting}
//         startDraft={startDraft}
//       />
//     )}
//     {drafts?.length > 0
//       ? drafts.map((d) => (
//           <Draft
//             drafts={drafts}
//             key={d.twuid}
//             // revalidate={revalidateDrafts}
//             published={published}
//             reviews={reviews}
//             setTweets={setTweets}
//             tweet={d}
//           />
//         ))
//       : renderPageState()}
//   </Grid>
// );
