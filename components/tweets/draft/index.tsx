// * Libraries
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

// * Hooks
import useDebounce from "@hooks/use-debounce";
import useDrafts from "@hooks/use-drafts";
import usePublished from "@hooks/use-published";
import useScope from "@hooks/use-scope";
import useTweet from "@hooks/use-tweet";

// * Helpers
import extractUrl from "@lib/client/extractUrl";
import getMetadata from "@lib/client/getMetadata";
import removeWww from "@lib/client/removeWww";

// * Modulz
import { Box, Card, Flex } from "@modulz/radix";

// * Components
import Comments from "@components/comments";
import ComposeFields from "@components/compose/fields";
import Controls from "@components/controls";
import Tweet from "@components/tweet";

const DraftTweet = () => {
  const [campaign, setCampaign] = useState("");
  const [editing, setEditing] = useState(false);
  const [editMetadata, setEditMetadata] = useState(null);
  const [editTweet, setEditTweet] = useState("");
  const [saving, setSaving] = useState(false);

  const { setDrafts } = useDrafts();
  const { setPublished } = usePublished();
  const { scope } = useScope();
  const router = useRouter();

  // * Get twuid from route query
  const { twuid } = router.query;

  // * Get tweet from twuid
  const { setTweet, tweet } = useTweet(twuid?.toString());

  const disableApprove = useMemo(() => {
    return (
      tweet?.createdBy === scope?.uid ||
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
        tweet: {
          ...tweet,
          approvals: [approval, ...tweet.approvals],
        },
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
      setDrafts([]);
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

  // * Debounce tweet to avoid repitive API calls
  const debouncedTweet = useDebounce(editTweet, 300);

  // * Update metadata when URL has changed
  useEffect(() => {
    async function updateMeta() {
      // * Do not run if no tweet present
      if (debouncedTweet) {
        console.log("URL", extractUrl(editTweet));
        // * Update metadata only when URL has changed
        if (extractUrl(editTweet) !== editMetadata?.url) {
          // * Get updated metadata from API
          const metadata = await getMetadata(editTweet);
          if (!metadata.err) {
            setEditMetadata(metadata);
            console.log("Metadata updated.");
          }
        }
      } else {
        console.log("No tweet present, not updating metadata.");
      }
    }
    updateMeta();
  }, [debouncedTweet]);

  const handleOnChange = async (e: React.FormEvent<HTMLTextAreaElement>) => {
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
      setDrafts([]);
      setPublished([]);
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
    setSaving(true);
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
        <Box sx={{ width: "100%" }} mr="16px">
          {editing ? (
            <ComposeFields
              campaign={campaign || tweet.campaign}
              handleCampaignChange={setCampaign}
              handleSave={handleUpdate}
              handleTweetChange={handleOnChange}
              handleUpdate={null}
              saving={saving}
              state="updating"
              text={editing ? editTweet : tweet.text}
            />
          ) : (
            <Comments />
          )}
          <Controls
            editing={editing}
            disableApprove={disableApprove}
            disableRefresh={tweet?.metadata?.cardType === "text"}
            handleApprove={handleApprove}
            handleCancelEdit={handleCancelEdit}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handlePublish={handlePublish}
            handleUpdate={handleUpdate}
          />
        </Box>
        <Tweet
          metadata={editMetadata || tweet?.metadata}
          scope={scope}
          text={editing ? editTweet : tweet.text}
        />
      </Flex>
    </Card>
  ) : null;
};

export default DraftTweet;
