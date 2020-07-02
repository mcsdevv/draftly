// * Libraries
import ago from "s-ago";

// * Hooks
import useScope from "@hooks/use-scope";
import useTweets from "@hooks/use-tweets";

// * Components
import Table from "@components/table";
import Row from "@components/table/row";
import DashboardLayout from "@components/layouts/dashboard";

function Drafts() {
  const { scope } = useScope();
  const { drafts, isValidating } = useTweets();

  return (
    <Table headers={["Text", "Created By", "Created At", "Last Updated"]}>
      {drafts &
        !isValidating?.map((d) => (
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
            twuid={d.twuid}
            type="drafts"
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
