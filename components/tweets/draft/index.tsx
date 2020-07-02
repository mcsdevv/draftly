// * Libraries
import { useState } from "react";
import { useRouter } from "next/router";

// * Hooks
import useScope from "@hooks/use-scope";
import useTweets from "@hooks/use-tweets";

// * Helpers
import getMetadata from "@lib/client/getMetadata";
import removeWww from "@lib/client/removeWww";

// * Components
import Comments from "@components/comments";
import Controls from "@components/controls";
import Grid from "@components/layout/grid";
import Tweet from "@components/tweet";

const DraftTweet = () => {
  const [editing, setEditing] = useState(false);
  const [editTweet, setEditTweet] = useState("");
  const { scope } = useScope();
  const { drafts, published, setTweets } = useTweets();
  const router = useRouter();

  // * Get twuid from route query
  const { twuid } = router.query;

  // * Get tweet from list of tweets using twuid
  const tweet = drafts?.find((d: any) => d.twuid === twuid);

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
      setTweets({
        drafts: drafts.filter((d: any) => d.twuid !== tweet.twuid),
        published,
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
        twuid,
      }),
    });
    if (res.status === 200) {
      const meta = await res.json();
      setTweets({
        drafts: drafts.map((d: any) =>
          d.twuid === tweet.twuid
            ? { ...d, metadata: meta, text: formattedTweet }
            : d
        ),
        published,
      });
    }
  };

  return tweet ? (
    <Grid columns="double">
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
          type="draft"
        />
      </Tweet>
      <Comments />
    </Grid>
  ) : null;
};

export default DraftTweet;
