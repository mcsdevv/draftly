// * Libraries
import ago from "s-ago";
import { useState } from "react";

// * Hooks
import useDrafts from "@hooks/use-drafts";
import useScope from "@hooks/use-scope";

// * Modulz
import { Container } from "@modulz/radix";

// * Components
import Row from "@components/table/row";
import Table from "@components/table";
import DashboardLayout from "@components/layouts/pages/dashboard";

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
