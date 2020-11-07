// * Libraries
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// * Hooks
import useDebounce from "@hooks/use-debounce";
import useDrafts from "@hooks/use-drafts";
import usePublished from "@hooks/use-published";
import useScope from "@hooks/use-scope";

// * Helpers
import extractUrl from "@lib/client/extractUrl";
import getMetadata from "@lib/client/getMetadata";
import removeWww from "@lib/client/removeWww";

// * Modulz
import { Box, Divider, Flex, Heading } from "@modulz/radix";

// * Components
import ComposeFields from "@components/compose/fields";
import Tweet from "@components/tweet";

const ComposeTweet = () => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [campaign, setCampaign] = useState("");
  const [metadata, setMetadata] = useState<any>(null);
  const [tweet, setTweet] = useState("");

  // * Initialize hooks
  const { setDrafts } = useDrafts();
  const { setPublished } = usePublished();
  const { scope } = useScope();

  // * Handles the saving of the tweet to the database
  const handleSaveDraft = async () => {
    // * Set the state to saving
    setSaving(true);

    // * Format URL and tweet by removing www
    const url = "/api/tweet/draft/create";
    const formattedTweet = removeWww(tweet);

    // * Send request
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        metadata,
        campaign,
        tweet: formattedTweet,
      }),
    });
    if (res.status === 200) {
      const newDraft = await res.json();
      const { twuid } = newDraft;
      setSaving(false);
      setDrafts([]);
      setPublished([]);
      redirectToDraft(twuid);
    }
  };

  const handleResetDraft = () => {
    setCampaign("");
    setMetadata(null);
    setTweet("");
  };

  // * Updates the campaign on change
  const handleCampaignChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCampaign(e.currentTarget.value);
  };

  // * Updates the tweet on change
  const handleTweetChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length < 281) {
      setTweet(e.currentTarget.value);
    }
  };

  // * Debounce tweet to avoid repitive API calls
  const debouncedTweet = useDebounce(extractUrl(tweet), 300);

  // * Update metadata when URL has changed
  useEffect(() => {
    async function updateMeta() {
      // * Do not run if no tweet present
      if (debouncedTweet) {
        // * Update metadata only when URL has changed
        if (extractUrl(tweet) !== metadata?.url) {
          // * Get updated metadata from API
          const metadata = await getMetadata(tweet);
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

  // * Redirects to created draft view
  const redirectToDraft = (twuid: string) => {
    router.push(
      "/[handle]/tweets/drafts/[twuid]",
      `/${router.query.handle}/tweets/drafts/${twuid}`,
      { shallow: true }
    );
  };

  return (
    <Box sx={{ height: "fit-content", width: "100%" }}>
      <Flex sx={{ height: "fit-content", width: "100%" }}>
        <ComposeFields
          campaign={campaign}
          context="creating"
          handleCampaignChange={handleCampaignChange}
          handleReset={handleResetDraft}
          handleUpdate={handleSaveDraft}
          handleTweetChange={handleTweetChange}
          saving={saving}
          tweet={tweet}
        />
        <Box ml="16px">
          <Heading as="h2" size={4} truncate>
            {campaign || "New Campaign..."}
          </Heading>
          <Divider mb={2} />
          <Tweet metadata={metadata} scope={scope} text={tweet} />
        </Box>
      </Flex>
    </Box>
  );
};

export default ComposeTweet;
