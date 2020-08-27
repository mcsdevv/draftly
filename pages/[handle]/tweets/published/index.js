// * Libraries
import ago from "s-ago";

// * Hooks
import usePublished from "@hooks/use-published";
import useScope from "@hooks/use-scope";

// * Modulz
import { Container } from "@modulz/radix";

// * Components
import DashboardLayout from "@components/layouts/pages/dashboard";
import Table from "@components/table";
import Row from "@components/table/row";

function Published() {
  const { published, setPublished } = usePublished();
  const { scope } = useScope();

  const handleDelete = async (twuid) => {
    // * Get tweet from list of tweets using twuid
    const tweet = published?.find((p) => p.twuid === twuid);

    const url = "/api/tweet/published/delete";
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        tweet_id: tweet.tweet_id,
        twuid,
      }),
    });
    if (res.status === 200) {
      setPublished({
        published: published.filter((p) => p.twuid !== twuid),
      });
    }
  };

  return (
    <Container size={2}>
      <Table
        headers={[
          "Title",
          "Text",
          "Created By",
          "Created At",
          "Last Updated",
          "View",
          "Delete",
        ]}
      >
        {published?.map((p) => (
          <Row
            handleOnDelete={() => handleDelete(p.twuid)}
            key={p.twuid}
            row={[
              p.title,
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
