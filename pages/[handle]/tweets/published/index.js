// * Libraries
import ago from "s-ago";
import { useState } from "react";

// * Hooks
import usePublished from "@hooks/use-published";
import useScope from "@hooks/use-scope";

// * Modulz
import { Container, Flex, Heading } from "@modulz/radix";

// * Components
import DashboardLayout from "@components/layouts/pages/dashboard";
import Link from "@components/link";
import Table from "@components/table";
import Row from "@components/table/row";

function Published() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { published, publishedPages, setPublished } = usePublished(limit, page);
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

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <Container size={2}>
      {publishedPages === 0 || publishedPages === undefined ? (
        <Flex
          mx="auto"
          sx={{
            alignItems: "center",
            flexDirection: "column",
            width: "fit-content",
          }}
        >
          <Heading mb={4} as="h2" size={4}>
            No tweets published!
          </Heading>
          <Link
            as={`/${scope?.handle}/tweets/drafts`}
            href="/[handle]/tweets/drafts"
            noMargin
            sx={{ width: "128px" }}
          >
            Publish a Draft
          </Link>
        </Flex>
      ) : (
        <Table
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          headers={[
            "Title",
            "Text",
            "Created By",
            "Created At",
            "Last Updated",
            "View",
            "Delete",
          ]}
          pageNumber={page}
          pageMax={publishedPages}
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
      )}
    </Container>
  );
}

Published.getLayout = (page) => (
  <DashboardLayout name="Published">{page}</DashboardLayout>
);

export default Published;
