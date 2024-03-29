// * Libraries
import { useEffect, useState } from "react";
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
import { Box, Divider, Flex, Heading } from "@modulz/radix";

// * Components
import Comments from "@components/comments";
import ComposeFields from "@components/compose/fields";
import Controls from "@components/controls/draft";
import Information from "@components/information/draft";
import Tab from "@components/tab";
import Tweet from "@components/tweet";

const DraftTweet = () => {
  // * Initialize state
  const [editing, setEditing] = useState(false);
  const [editCampaign, setEditCampaign] = useState("");
  const [editTweet, setEditTweet] = useState<any>("");
  const [metadata, setMetadata] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("tweet");

  // * Initialize hooks
  const { setDrafts } = useDrafts();
  const { setPublished } = usePublished();
  const { scope } = useScope();
  const router = useRouter();

  // * Get twuid from route query
  const { twuid } = router.query;

  // * Get tweet from twuid
  const { setTweet, tweet } = useTweet(twuid?.toString());

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
    if (!editCampaign) setEditCampaign(tweet.campaign);

    // * Has not been edited before, so initialize metadata
    if (!editTweet) {
      setEditTweet(tweet.text);
      setMetadata(tweet.metadata);
    }
  };

  // * Updates the campaign on change
  const handleCampaignChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEditCampaign(e.currentTarget.value);
  };

  const handleTweetChange = async (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length < 281) {
      setEditTweet(e.currentTarget.value);
    }
  };

  // * Debounce tweet to avoid repitive API calls
  const debouncedTweet = useDebounce(editTweet ? editTweet : tweet?.text, 300);

  // * Update metadata when URL has changed
  useEffect(() => {
    async function updateMeta() {
      // * Do not run if no tweet present
      if (debouncedTweet) {
        // * Update metadata only when URL has changed
        if (extractUrl(editTweet) !== metadata?.url) {
          // * Get updated metadata from API
          const metadata = await getMetadata(editTweet);
          if (!metadata.err) {
            setMetadata(metadata);
          }
        }
      } else {
        setMetadata(null);
      }
    }
    updateMeta();
  }, [debouncedTweet]);

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

  const handleReset = () => {
    setEditCampaign("");
    setEditTweet("");
  };

  const handleUpdate = async () => {
    // TODO Why this shit out of date? editTweet never current...
    console.log("OLD", tweet.text);
    console.log("NEW", editTweet);

    // * No changes made, no need to update
    if (tweet.text === editTweet && tweet.campaign === editCampaign) {
      setEditing(false);
      return;
    }

    // * Changes made, update tweet
    setSaving(true);

    const url = "/api/tweet/draft/update";
    const formattedTweet = removeWww(editTweet);
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        campaign: editCampaign,
        metadata,
        text: formattedTweet,
        twuid,
        urlRemoved: !!tweet?.url && !metadata?.url,
      }),
    });
    if (res.status === 200) {
      const updatedTweet = await res.json();
      setEditing(false);
      setSaving(false);
      setTweet({ tweet: { ...updatedTweet } });
    }
  };

  return tweet ? (
    <Box sx={{ height: "fit-content", width: "100%" }}>
      <Flex sx={{ height: 532, width: "100%" }}>
        <Flex sx={{ flexDirection: "column", width: "100%" }}>
          <Flex mb={4}>
            <Tab
              handleOnClick={() => setTab("tweet")}
              name="Tweet"
              selected={tab === "tweet"}
            />
            <Tab
              handleOnClick={() => setTab("comments")}
              name="Comments"
              selected={tab === "comments"}
            />
          </Flex>
          {tab === "tweet" ? (
            <Flex
              sx={{
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              {editing ? (
                <ComposeFields
                  campaign={editCampaign}
                  context="updating"
                  handleCampaignChange={handleCampaignChange}
                  handleReset={handleReset}
                  handleUpdate={handleUpdate}
                  handleTweetChange={handleTweetChange}
                  saving={saving}
                  tweet={editTweet}
                />
              ) : (
                <Information
                  approvals={tweet.approvals}
                  createdAt={tweet.createdAt}
                  createdBy={tweet.creator}
                  lastUpdated={tweet.updatedAt}
                  members={[...scope.members, ...scope.owners]}
                  reviewsRequired={scope.reviewsRequired}
                  team={scope}
                  tweet={tweet}
                />
              )}
              <Controls
                approvals={tweet.approvals}
                approvalsRequired={tweet.reviewsRequired}
                editing={editing}
                handleApprove={handleApprove}
                handleCancelEdit={handleCancelEdit}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handlePublish={handlePublish}
              />
            </Flex>
          ) : (
            <Comments />
          )}
        </Flex>
        <Box ml="16px">
          <Heading as="h2" size={4}>
            {editing ? editCampaign : tweet.campaign}
          </Heading>
          <Divider mb={4} />
          <Tweet
            metadata={editing ? metadata : tweet?.metadata}
            scope={scope}
            text={editing ? editTweet : tweet?.text}
          />
        </Box>
      </Flex>
    </Box>
  ) : null;
};

export default DraftTweet;
