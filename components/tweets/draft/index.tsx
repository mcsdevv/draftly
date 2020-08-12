// * Libraries
import { useMemo, useState } from "react";
import { useRouter } from "next/router";

// * Hooks
import useScope from "@hooks/use-scope";
import useTweets from "@hooks/use-tweets";

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
  const { scope } = useScope();
  const { drafts, published, setTweets } = useTweets();
  const router = useRouter();

  // * Get twuid from route query
  const { twuid } = router.query;

  // * Get tweet from list of tweets using twuid
  const tweet = drafts?.find((d: any) => d.twuid === twuid);

  // ! USE MEMO
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
      const approvedDrafts = drafts.map((d: any) => {
        if (d.twuid === tweet.twuid) {
          return { ...d, approvals: [approval, ...d.approvals] };
        }
        return d;
      });
      setTweets({
        drafts: approvedDrafts,
        published,
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
      setTweets({
        drafts: drafts.filter((d: any) => d.twuid !== tweet.twuid),
        published,
      });
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
      const publishedTweet = drafts.find((r: any) => r.twuid === tweet.twuid);
      setTweets({
        drafts: drafts.filter((r: any) => r.twuid !== tweet.twuid),
        published: [...published, publishedTweet],
      });
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
      setTweets({
        drafts: drafts.map((d: any) =>
          d.twuid === tweet.twuid
            ? { ...d, metadata: meta, text: formattedTweet }
            : d
        ),
        published,
      });
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
