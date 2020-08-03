// * Libraries
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
  Input,
  Subheading,
  Textarea,
} from "@modulz/radix";

// * Components
import Characters from "@components/characters";

const ComposeTweet = () => {
  const [title, setTitle] = useState("");
  const [tweet, setTweet] = useState("");
  const [saving, setSaving] = useState(false);
  const { drafts, published, setTweets } = useTweets();

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
      const newDraft = await res.json();
      setTweets({ drafts: [newDraft, ...drafts], published });
      setSaving(false);
      setTweet("");
    }
  };

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleTweetChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    // TODO Improve character limit handling
    if (tweet.length < 280) {
      setTweet(e.currentTarget.value);
    } else {
      alert("over the limit bud");
    }
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
      <Container sx={{ width: "640px" }} size={2} mb={4}>
        <Subheading mb={2}>Tweet Title</Subheading>
        <Input
          mb={4}
          onChange={handleTitleChange}
          size={1}
          type="email"
          value={title}
        />
        <Subheading mb={2}>Tweet Body</Subheading>
        <Textarea
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
    </Flex>
  );
};

export default ComposeTweet;
