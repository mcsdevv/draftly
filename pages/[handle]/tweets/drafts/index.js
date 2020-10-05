// * Libraries
import ago from "s-ago";
import { useState } from "react";

// * Hooks
import useDrafts from "@hooks/use-drafts";
import useScope from "@hooks/use-scope";

// * Modulz
import { Container, Flex, Heading } from "@modulz/radix";

// * Components
import DashboardLayout from "@components/layouts/pages/dashboard";
import Link from "@components/link";
import Row from "@components/table/row";
import Table from "@components/table";

function Drafts() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { drafts, draftsPages, setDrafts } = useDrafts(limit, page);
  const { scope } = useScope();

  const handleDelete = async (twuid) => {
    const url = "/api/tweet/draft/delete";
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        twuid,
      }),
    });
    if (res.status === 200) {
      setDrafts({
        drafts: drafts.filter((d) => d.twuid !== twuid),
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
      {draftsPages === 0 ? (
        <Flex
          mx="auto"
          sx={{
            alignItems: "center",
            flexDirection: "column",
            width: "fit-content",
          }}
        >
          <Heading mb={4} as="h2" size={4}>
            No drafts present!
          </Heading>
          <Link
            as={`/${scope?.handle}/tweets/new`}
            href="/[handle]/tweets/new"
            noMargin
          >
            Create a Draft
          </Link>
        </Flex>
      ) : (
        <Table
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          loading={draftsPages === undefined}
          pageNumber={page}
          pageMax={draftsPages}
        >
          {drafts?.map((d) => (
            <Row
              handleOnDelete={() => handleDelete(d.twuid)}
              key={d.twuid}
              row={[
                d.title,
                d.text,
                [...scope?.members, ...scope?.owners].find(
                  (m) => m.uid === d.createdBy
                )?.name,
                ago(new Date(d.createdAt)),
                ago(new Date(d.updatedAt)),
              ]}
              twuid={d.twuid}
              type="drafts"
            />
          ))}
        </Table>
      )}
    </Container>
  );
}

Drafts.getLayout = (page) => (
  <DashboardLayout name="Drafts">{page}</DashboardLayout>
);

export default Drafts;
