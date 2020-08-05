// * Libraries
import { useState } from "react";
import { useRouter } from "next/router";

// * Hooks
import useScope from "@hooks/use-scope";
import useTweets from "@hooks/use-tweets";

// * Helpers
import getMetadata from "@lib/client/getMetadata";
import removeWww from "@lib/client/removeWww";

// * Modulz
import { Card, Flex } from "@modulz/radix";

// * Components
import Comments from "@components/comments";
import Controls from "@components/controls";
import Tweet from "@components/tweet";

const PublishedTweet = () => {
  const { scope } = useScope();
  const { drafts, published, setTweets } = useTweets();
  const router = useRouter();

  // * Get twuid from route query
  const { twuid } = router.query;

  // * Get tweet from list of tweets using twuid
  const tweet = published?.find((p: any) => p.twuid === twuid);

  const handleDelete = async () => {
    const url = "/api/tweet/published/delete";
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        twuid,
      }),
    });
    if (res.status === 200) {
      setTweets({
        drafts,
        published: published.filter((p: any) => p.twuid !== tweet.twuid),
      });
      router.push(
        "/[handle]/tweets/published",
        `/${router.query.handle}/tweets/published/`,
        { shallow: true }
      );
    }
  };

  return tweet ? (
    <Card sx={{ height: "fit-content", width: "100%" }}>
      <Flex sx={{ height: "fit-content", width: "100%" }}>
        <Tweet metadata={tweet.metadata} scope={scope} text={tweet.text}>
          <Controls handleDelete={handleDelete} type="published" />
        </Tweet>
        <Comments />
      </Flex>
    </Card>
  ) : null;
};

export default PublishedTweet;
