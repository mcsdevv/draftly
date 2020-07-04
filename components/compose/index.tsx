// * Libraries
import { useState } from "react";

// * Hooks
import useTweets from "@hooks/use-tweets";

// * Helpers
import getMetadata from "@lib/client/getMetadata";
import removeWww from "@lib/client/removeWww";

// * Modulz
import { Button, Container, Flex } from "@modulz/radix";

// * Components
import Characters from "@components/characters";
import Textarea from "@components/textarea";

interface ComposeTweetProps {
  setDrafting: (k: boolean) => void;
}

const ComposeTweet = ({ setDrafting }: ComposeTweetProps) => {
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
        tweet: formattedTweet,
      }),
    });
    if (res.status === 200) {
      const newDraft = await res.json();
      setTweets({ drafts: [newDraft, ...drafts], published });
      setDrafting(false);
      setSaving(false);
      setTweet("");
    }
  };
  const handleOnChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    // TODO Improve character limit handling
    if (tweet.length < 280) {
      setTweet(e.currentTarget.value);
    } else {
      alert("over the limit bud");
    }
  };
  return (
    <Flex
      sx={{
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
      }}
    >
      {!saving ? (
        <>
          <Container mb={4}>
            <Textarea
              placeholder="Draft your tweet..."
              onChange={handleOnChange}
              type="compose"
              value={tweet}
            />
            <Characters progress={(tweet.length / 280) * 100} />
          </Container>
          <Flex
            sx={{
              margin: "0 auto",
            }}
          >
            <Button onClick={() => setDrafting(false)}>Cancel Draft</Button>
            <Button disabled={!tweet} onClick={handleSaveDraft} variant="blue">
              Save Draft
            </Button>
          </Flex>
        </>
      ) : (
        <h2>Saving Draft...</h2>
      )}
    </Flex>
  );
};

export default ComposeTweet;
