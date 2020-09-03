// * Libraries
import { useRouter } from "next/router";

// * Hooks
import usePublished from "@hooks/use-published";
import useScope from "@hooks/use-scope";
import useTweet from "@hooks/use-tweet";

// * Modulz
import { Card, Flex } from "@modulz/radix";

// * Components
import Comments from "@components/comments";
import Metrics from "@components/metrics";
import Tweet from "@components/tweet";

const PublishedTweet = () => {
  const { scope } = useScope();
  const { setPublished } = usePublished();
  const router = useRouter();

  // * Get twuid from route query
  const { twuid } = router.query;

  // * Get tweet from twuid
  const { tweet } = useTweet(twuid?.toString());

  const handleDelete = async () => {
    const url = "/api/tweet/published/delete";
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        tweet_id: tweet.tweet_id,
        twuid,
      }),
    });
    if (res.status === 200) {
      setPublished([]);
      router.push(
        "/[handle]/tweets/published",
        `/${router.query.handle}/tweets/published/`,
        { shallow: true }
      );
    }
  };

  return tweet && twuid ? (
    <Card sx={{ height: "fit-content", width: "100%" }}>
      <Flex sx={{ height: "fit-content", width: "100%" }}>
        <Tweet metadata={tweet.metadata} scope={scope} text={tweet.text}>
          <Metrics handleDelete={handleDelete} />
        </Tweet>
        <Comments />
      </Flex>
    </Card>
  ) : null;
};

export default PublishedTweet;
