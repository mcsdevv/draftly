// * Libraries
import { useMemo, useState } from "react";
import { useRouter } from "next/router";

// * Hooks
import useDrafts from "@hooks/use-drafts";
import usePublished from "@hooks/use-published";
import useScope from "@hooks/use-scope";
import useTweet from "@hooks/use-tweet";

// * Helpers
import getMetadata from "@lib/client/getMetadata";
import removeWww from "@lib/client/removeWww";

// * Modulz
import { Card, Flex } from "@modulz/radix";

// * Components
import Comments from "@components/comments";
import Controls from "@components/controls";
import Tweet from "@components/tweet";

const DraftTweet = () => {
  const [editing, setEditing] = useState(false);
  const [editTweet, setEditTweet] = useState("");

  const { revalidateDrafts } = useDrafts();
  const { revalidatePublished } = usePublished();
  const { scope } = useScope();
  const router = useRouter();

  // * Get twuid from route query
  const { twuid } = router.query;

  // * Get tweet from twuid
  const { setTweet, tweet } = useTweet(twuid?.toString());

  const disableApprove = useMemo(() => {
    return (
      tweet?.created_by === scope?.uid ||
      tweet?.approvals.find((a: any) => a.uid === scope?.uid)
    );
  }, [scope, tweet]);

  const handleApprove = async () => {
    const url = "/api/tweet/draft/approve";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        twuid,
      }),
    });
    if (res.status === 200) {
      const approval = await res.json();
      setTweet({
        ...tweet,
        approvals: [approval, ...tweet.approvals],
      });
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleDelete = async () => {
    const url = "/api/tweet/draft/delete";
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        twuid,
      }),
    });
    if (res.status === 200) {
      revalidateDrafts();
      router.push(
        "/[handle]/tweets/drafts",
        `/${router.query.handle}/tweets/drafts/`,
        { shallow: true }
      );
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setEditTweet(tweet.text);
  };

  const handleOnChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length < 281) {
      setEditTweet(e.currentTarget.value);
    }
  };

  const handlePublish = async () => {
    const url = "/api/tweet/published/create";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        text: tweet.text,
        twuid: tweet.twuid,
      }),
    });
    if (res.status === 200) {
      revalidateDrafts();
      revalidatePublished();
      router.push(
        "/[handle]/tweets/published",
        `/${router.query.handle}/tweets/published/`,
        { shallow: true }
      );
    }
  };

  const handleUpdate = async () => {
    // * No changes made, no need to update
    if (tweet.text === editTweet) {
      setEditing(false);
      return;
    }

    // * Changes made, update tweet
    setEditing(false);
    const metadata = await getMetadata(editTweet);
    const url = "/api/tweet/draft/update";
    const formattedTweet = removeWww(editTweet);
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        metadata,
        text: formattedTweet,
        twuid,
      }),
    });
    if (res.status === 200) {
      const meta = await res.json();
      setTweet({ tweet: { ...tweet, metadata: meta, text: formattedTweet } });
    }
  };

  return tweet ? (
    <Card sx={{ height: "fit-content", width: "100%" }}>
      <Flex sx={{ height: "fit-content", width: "100%" }}>
        <Tweet
          editing={editing}
          editTweet={editTweet}
          handleOnChange={handleOnChange}
          metadata={tweet.metadata}
          scope={scope}
          text={tweet.text}
        >
          <Controls
            editing={editing}
            disableApprove={disableApprove}
            handleApprove={handleApprove}
            handleCancelEdit={handleCancelEdit}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handlePublish={handlePublish}
            handleUpdate={handleUpdate}
          />
        </Tweet>
        <Comments />
      </Flex>
    </Card>
  ) : null;
};

export default DraftTweet;
