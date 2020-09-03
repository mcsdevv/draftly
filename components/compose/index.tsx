// * Libraries
import { useRouter } from "next/router";
import { useState } from "react";

// * Hooks
import useDrafts from "@hooks/use-drafts";
import usePublished from "@hooks/use-published";

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
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const { setDrafts } = useDrafts();
  const { setPublished } = usePublished();

  // * Resets state to page defaults
  const handleCreateAnother = () => {
    setCompleted(false);
    setCreatedId("");
  };

  // * Handles the saving of the tweet to the database
  const handleSaveDraft = async () => {
    setSaving(true);
    const metadata = await getMetadata(text);
    const url = "/api/tweet/draft/create";
    const formattedTweet = removeWww(text);
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
      setSaving(false);
      setDrafts([]);
      setPublished([]);
      setTitle("");
      setText("");
    }
  };

  // * Updates the title on change
  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  // * Updates the tweet on change
  const handleTweetChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value.length < 281) {
      setText(e.currentTarget.value);
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
          <Container sx={{ width: "640px" }} size={1} mb={4}>
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
              // onKeyDown={handleOnKeyDown}
              value={text}
            />
            <Characters progress={(text.length / 280) * 100} />
          </Container>
          <Flex
            sx={{
              margin: "0 auto",
            }}
          >
            <Button
              disabled={!text || !title}
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
