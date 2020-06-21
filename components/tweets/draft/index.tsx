import { useState } from "react";

import useScope from "@hooks/use-scope";

import getMetadata from "@lib/client/getMetadata";
import removeWww from "@lib/client/removeWww";

import Controls from "../../controls";
import Tweet from "../../tweet";

interface DraftProps {
  drafts: any[];
  published: any[];
  revalidate: () => void;
  reviews: any[];
  setTweets: any;
  tweet: any;
}

const Draft = ({
  drafts,
  published,
  reviews,
  revalidate,
  setTweets,
  tweet,
}: DraftProps) => {
  const [editing, setEditing] = useState(false);
  const [editTweet, setEditTweet] = useState("");
  const [scope] = useScope();
  const handleCancelEdit = () => {
    setEditing(false);
  };
  const handleDelete = async () => {
    const url = "/api/tweet/draft/delete";
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        twuid: tweet.twuid,
      }),
    });
    if (res.status === 200) {
      setTweets({
        drafts: drafts.filter((d) => d.twuid !== tweet.twuid),
        published,
        reviews,
      });
    }
  };
  const handleEdit = () => {
    setEditing(true);
    setEditTweet(tweet.text);
  };
  const handleOnChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    // TODO Improve character limit handling
    if (editTweet?.length < 280) {
      setEditTweet(e.currentTarget.value);
    } else {
      alert("over the limit bud");
    }
  };
  const handleReviewReady = async () => {
    const url = "/api/tweet/review/create";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        twuid: tweet.twuid,
      }),
    });
    if (res.status === 200) {
      setTweets({
        drafts: drafts.filter((d) => d.twuid !== tweet.twuid),
        published,
        reviews: [...reviews, tweet],
      });
    }
  };
  const handleUpdate = async () => {
    // * No changes made, no need to update
    if (tweet.text === editTweet) {
      setEditing(false);
      return;
    }
    // * Changes made, update tweet
    setEditing(false);
    const metadata = await getMetadata(editTweet);
    const url = "/api/tweet/draft/update";
    const formattedTweet = removeWww(editTweet);
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        metadata,
        text: formattedTweet,
        twuid: tweet.twuid,
      }),
    });
    if (res.status === 200) {
      const meta = await res.json();
      setTweets({
        drafts: drafts.map((d) =>
          d.twuid === tweet.twuid
            ? { ...d, metadata: meta, text: formattedTweet }
            : d
        ),
        published,
        reviews,
      });
    }
  };
  console.log("draft", tweet);
  // TODO Account for multiple Twitter card types - https://www.oncrawl.com/oncrawl-seo-thoughts/a-complete-guide-to-twitter-cards/
  return (
    <Tweet
      editing={editing}
      editTweet={editTweet}
      handleOnChange={handleOnChange}
      metadata={tweet.metadata}
      scope={scope}
      text={tweet.text}
    >
      <Controls
        editing={editing}
        handleCancelEdit={handleCancelEdit}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleUpdate={handleUpdate}
        handleReviewReady={handleReviewReady}
        type="draft"
      />
    </Tweet>
  );
};

export default Draft;
