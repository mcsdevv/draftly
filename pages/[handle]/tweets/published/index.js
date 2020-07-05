// * Libraries
import ago from "s-ago";

// * Hooks
import useScope from "@hooks/use-scope";
import useTweets from "@hooks/use-tweets";

// * Modulz
import { Container } from "@modulz/radix";

// * Components
import DashboardLayout from "@components/layouts/dashboard";
import Table from "@components/table";
import Row from "@components/table/row";

function Published() {
  const { scope } = useScope();
  const { published } = useTweets();

  return (
    <Container size={2}>
      <Table headers={["Text", "Created By", "Created At", "Last Updated"]}>
        {published?.map((p) => (
          <Row
            key={p.twuid}
            row={[
              p.text,
              [...scope?.members, ...scope?.owners].find(
                (m) => m.uid === p.created_by
              )?.name,
              ago(new Date(p.created_at)),
              ago(new Date(p.updated_at)),
            ]}
            twuid={p.twuid}
            type="published"
          />
        ))}
      </Table>
    </Container>
  );
}

Published.getLayout = (page) => (
  <DashboardLayout name="Published">{page}</DashboardLayout>
);

export default Published;
