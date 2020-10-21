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
  const [createdId, setCreatedId] = useState("");
  const [saving, setSaving] = useState(false);
  const [campaign, setCampaign] = useState("");
  const [metadata, setMetadata] = useState<any>(null);
  const [text, setText] = useState("");

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
    const formattedTweet = removeWww(text);

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
      setCreatedId(newDraft.twuid);
      setSaving(false);
      setDrafts([]);
      setPublished([]);
      redirectToDraft();
    }
  };

  const handleResetDraft = () => {
    setCampaign("");
    setMetadata(null);
    setText("");
  };

  // * Updates the campaign on change
  const handleCampaignChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCampaign(e.currentTarget.value);
  };

  // * Updates the tweet on change
  const handleTweetChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length < 281) {
      setText(e.currentTarget.value);
    }
  };

  // * Debounce tweet to avoid repitive API calls
  const debouncedTweet = useDebounce(metadata?.url, 300);

  // * Update metadata when URL has changed
  useEffect(() => {
    async function updateMeta() {
      // * Do not run if no tweet present
      if (debouncedTweet) {
        // * Update metadata only when URL has changed
        if (extractUrl(text) !== metadata?.url) {
          // * Get updated metadata from API
          const metadata = await getMetadata(text);
          if (!metadata.err) {
            setMetadata(metadata);
            console.log("Metadata updated.");
          }
        }
      } else {
        console.log("No tweet present, metadata set to null.");
        setMetadata(null);
      }
    }
    updateMeta();
  }, [debouncedTweet]);

  // * Redirects to created draft view
  const redirectToDraft = () => {
    router.push(
      "/[handle]/tweets/drafts/[twuid]",
      `/${router.query.handle}/tweets/drafts/${createdId}`,
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
          handleSave={handleSaveDraft}
          handleTweetChange={handleTweetChange}
          saving={saving}
          text={text}
        />
        <Box ml="16px">
          <Heading as="h2" size={4} truncate>
            {campaign || "New Campaign..."}
          </Heading>
          <Divider mb={2} />
          <Tweet metadata={metadata} scope={scope} text={text} />
        </Box>
      </Flex>
    </Box>
  );
};

export default ComposeTweet;
