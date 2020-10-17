// * Libraries
import { useRouter } from "next/router";
import { useState } from "react";

// * Hooks
import useDrafts from "@hooks/use-drafts";
import usePublished from "@hooks/use-published";
import useScope from "@hooks/use-scope";

// * Helpers
import getMetadata from "@lib/client/getMetadata";
import removeWww from "@lib/client/removeWww";

// * Modulz
import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Heading,
  Input,
  Subheading,
  Textarea,
} from "@modulz/radix";

// * Components
import Characters from "@components/characters";
import Tweet from "@components/tweet";

const ComposeTweet = () => {
  const router = useRouter();
  const [createdId, setCreatedId] = useState("");
  const [saving, setSaving] = useState(false);
  const [campaign, setCampaign] = useState("");
  const [metadata, setMetadata] = useState(null);
  const [text, setText] = useState("");

  // * Initialize hooks
  const { setDrafts } = useDrafts();
  const { setPublished } = usePublished();
  const { scope } = useScope();

  // * Handles the saving of the tweet to the database
  const handleSaveDraft = async () => {
    // * Set the state to saving
    setSaving(true);

    // * Get the metadata based on URL's
    const metadata = await getMetadata(text);
    const url = "/api/tweet/draft/create";
    const formattedTweet = removeWww(text);
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
      handleViewCreatedDraft();
    }
  };

  // * Updates the campaign on change
  const handleCampaignChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCampaign(e.currentTarget.value);
  };

  // * Updates the tweet on change
  const handleTweetChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length < 281) {
      setText(e.currentTarget.value);
      updateMeta(e.currentTarget.value);
    }
  };

  const updateMeta = async (text: string) => {
    // * Request updated metadata including card type
    const metadata = await getMetadata(text);

    // * If no error, update local metadata
    if (!metadata.err) {
      setMetadata(metadata);
      console.log("META", metadata);
    } else {
      console.log("Error fetching updated metadata:", metadata.err);
    }
  };

  // * Redirects to created draft view
  const handleViewCreatedDraft = () => {
    router.push(
      "/[handle]/tweets/drafts/[twuid]",
      `/${router.query.handle}/tweets/drafts/${createdId}`,
      { shallow: true }
    );
  };

  return (
    <Card sx={{ height: "fit-content", width: "100%" }}>
      <Flex sx={{ height: "fit-content", width: "100%" }}>
        <Card sx={{ width: "100%" }}>
          <Subheading mb={2}>Campaign</Subheading>
          <Input
            disabled={saving}
            mb={4}
            onChange={handleCampaignChange}
            size={1}
            type="email"
            value={campaign}
          />
          <Subheading mb={2}>Text</Subheading>
          <Textarea
            disabled={saving}
            placeholder="Draft your tweet..."
            onChange={handleTweetChange}
            value={text}
          />
          <Characters progress={(text.length / 280) * 100} />
          <Button
            disabled={!campaign || !text}
            isWaiting={saving}
            ml={2}
            onClick={handleSaveDraft}
            variant="blue"
          >
            Create Draft
          </Button>
        </Card>
        <Box ml="16px">
          <Heading as="h2" size={4}>
            Campaign - {campaign}
          </Heading>
          <Divider mb={2} />
          <Tweet
            editing={false}
            editTweet={""}
            handleOnChange={() => null}
            metadata={metadata}
            scope={scope}
            text={text}
          />
        </Box>
      </Flex>
    </Card>
  );
};

export default ComposeTweet;
