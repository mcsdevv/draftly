// * Libraries
import ago from "s-ago";

// * Hooks
import useScope from "@hooks/use-scope";
import useTweets from "@hooks/use-tweets";

// * Modulz
import { Container } from "@modulz/radix";

// * Components
import Table from "@components/table";
import Row from "@components/table/row";
import DashboardLayout from "@components/layouts/dashboard";

function Drafts() {
  const { scope } = useScope();
  const { drafts } = useTweets();

  return (
    <Container size={2}>
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
            twuid={d.twuid}
            type="drafts"
          />
        ))}
      </Table>
    </Container>
  );
}

Drafts.getLayout = (page) => (
  <DashboardLayout name="Drafts">{page}</DashboardLayout>
);

export default Drafts;
