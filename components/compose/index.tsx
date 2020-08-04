// * Libraries
import { useRouter } from "next/router";
import { useState } from "react";

// * Hooks
import useTweets from "@hooks/use-tweets";

// * Helpers
import getMetadata from "@lib/client/getMetadata";
import removeWww from "@lib/client/removeWww";

// * Modulz
import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Subheading,
  Textarea,
} from "@modulz/radix";

// * Components
import Characters from "@components/characters";

const ComposeTweet = () => {
  const router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [createdId, setCreatedId] = useState("");
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [tweet, setTweet] = useState("");
  const { drafts, published, setTweets } = useTweets();

  // * Resets state to page defaults
  const handleCreateAnother = () => {
    setCompleted(false);
    setCreatedId("");
  };

  // * Handles the saving of the tweet to the database
  const handleSaveDraft = async () => {
    setSaving(true);
    const metadata = await getMetadata(tweet);
    const url = "/api/tweet/draft/create";
    const formattedTweet = removeWww(tweet);
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        metadata,
        title,
        tweet: formattedTweet,
      }),
    });
    if (res.status === 200) {
      setCompleted(true);
      const newDraft = await res.json();
      setCreatedId(newDraft.twuid);
      setTweets({ drafts: [newDraft, ...drafts], published });
      setSaving(false);
      setTitle("");
      setTweet("");
    }
  };

  // * Updates the title on change
  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  // * Updates the tweet on change
  const handleTweetChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    // TODO Improve character limit handling
    if (tweet.length < 280) {
      setTweet(e.currentTarget.value);
    } else {
      alert("over the limit bud");
    }
  };

  // * Redirects to view all drafts
  const handleViewDrafts = () => {
    router.push(
      "/[handle]/tweets/drafts",
      `/${router.query.handle}/tweets/drafts/`,
      { shallow: true }
    );
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
    <Flex
      mx="auto"
      my={4}
      sx={{
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
      }}
    >
      {!completed ? (
        <>
          <Container sx={{ width: "640px" }} size={2} mb={4}>
            <Subheading mb={2}>Tweet Title</Subheading>
            <Input
              disabled={saving}
              mb={4}
              onChange={handleTitleChange}
              size={1}
              type="email"
              value={title}
            />
            <Subheading mb={2}>Tweet Body</Subheading>
            <Textarea
              disabled={saving}
              placeholder="Draft your tweet..."
              onChange={handleTweetChange}
              value={tweet}
            />
            <Characters progress={(tweet.length / 280) * 100} />
          </Container>
          <Flex
            sx={{
              margin: "0 auto",
            }}
          >
            <Button
              disabled={!tweet || !title}
              isWaiting={saving}
              ml={2}
              onClick={handleSaveDraft}
              variant="blue"
            >
              Create Draft
            </Button>
          </Flex>
        </>
      ) : (
        <Flex sx={{ flexDirection: "column" }}>
          <Heading mb={4} as="h2" size={4}>
            Draft Created!
          </Heading>
          <Button
            mb={4}
            sx={{ cursor: "pointer" }}
            onClick={handleViewCreatedDraft}
          >
            View Created Draft
          </Button>
          <Button
            mb={4}
            sx={{ cursor: "pointer" }}
            onClick={handleCreateAnother}
          >
            Create Another Draft
          </Button>
          <Button sx={{ cursor: "pointer" }} onClick={handleViewDrafts}>
            View Draft Tweets
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default ComposeTweet;
