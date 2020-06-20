import { useState } from "react";

import useTweets from "@hooks/use-tweets";

import getMeta from "@lib/client/getMeta";
import removeWww from "@lib/client/removeWww";

import Button from "../button";
import Characters from "../characters";
import Textarea from "../textarea";

import styles from "./compose.module.css";

interface ComposeTweetProps {
  setDrafting: (k: boolean) => void;
}

const ComposeTweet = ({ setDrafting }: ComposeTweetProps) => {
  const [tweet, setTweet] = useState("");
  const [saving, setSaving] = useState(false);
  const { drafts, published, reviews, setTweets } = useTweets();
  const handleSaveDraft = async () => {
    setSaving(true);
    const metadata = await getMeta(tweet);
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
      setTweets({ drafts: [newDraft, ...drafts], published, reviews });
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
    <div className={styles.compose}>
      {!saving ? (
        <>
          <div className={styles.container}>
            <Textarea
              placeholder="Draft your tweet..."
              onChange={handleOnChange}
              type="compose"
              value={tweet}
            />
            <Characters progress={(tweet.length / 280) * 100} />
          </div>
          <div className={styles.buttons}>
            <Button
              margin={false}
              onClick={() => setDrafting(false)}
              type="secondary"
            >
              Cancel Draft
            </Button>
            <Button disabled={!tweet} onClick={handleSaveDraft}>
              Save Draft
            </Button>
          </div>
        </>
      ) : (
        <h2>Saving Draft...</h2>
      )}
    </div>
  );
};

export default ComposeTweet;
