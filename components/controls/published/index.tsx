// * Libraries
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";

// * Hooks
import usePublished from "@hooks/use-published";
import useScope from "@hooks/use-scope";
import useTweet from "@hooks/use-tweet";
import useUser from "@hooks/use-user";

// * Modulz
import { Box, Button, Flex, Tooltip } from "@modulz/radix";

const Controls = () => {
  // * Box component surrounds buttons to allow for tooltips to be shown on disabled button.
  // * Initialize hooks
  const router = useRouter();
  const { scope } = useScope();
  const { setPublished } = usePublished();
  const { user } = useUser();

  // * Get twuid from route query
  const { twuid } = router.query;

  // * Get tweet from twuid
  const { setTweet, tweet } = useTweet(twuid?.toString());

  // * Update metrics on page load, serve stale until then
  useEffect(() => {
    getMetrics();
  }, []);

  // * Gets metrics for the specified tweet and mutates SWR
  const getMetrics = async () => {
    const url = "/api/tweet/published/metrics";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ tweetId: tweet.tweetId, twuid }),
    });
    if (res.status === 200) {
      const newMetrics = await res.json();
      setTweet({ tweet: { ...tweet, ...newMetrics } });
    }
  };

  const handleCopy = () => {
    console.log("Copied");
  };

  const handleDelete = async () => {
    const url = "/api/tweet/published/delete";
    const res = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        tweetId: tweet.tweetId,
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

  const handleRefresh = () => {
    getMetrics();
  };

  const isOwner = useMemo(
    () => scope.owners.find((o: any) => o.uid === user.uid),
    [scope]
  );
  return (
    <Box>
      <Flex sx={{ justifyContent: "space-between" }}>
        <Tooltip label="Click to view this tweet live." align="center">
          <Box>
            <a
              href={`https://twitter.com/${scope.handle}/status/${tweet.tweetId}`}
              target="_blank"
            >
              <Button sx={{ cursor: "pointer", width: 100 }}>View</Button>
            </a>
          </Box>
        </Tooltip>
        <Tooltip label="Click to copy a link to the tweet." align="center">
          <Box>
            <Button sx={{ cursor: "pointer", width: 100 }} onClick={handleCopy}>
              Copy Link
            </Button>
          </Box>
        </Tooltip>
        <Tooltip label="Click to refresh tweet metrics." align="center">
          <Box>
            <Button
              sx={{ cursor: "pointer", width: 100 }}
              onClick={handleRefresh}
            >
              Refresh
            </Button>
          </Box>
        </Tooltip>
        <Tooltip
          label={
            !isOwner
              ? "Only owners can delete live tweets."
              : "Click to delete this tweet."
          }
          align="center"
        >
          <Box>
            <Button
              sx={{ cursor: "pointer", width: 100 }}
              disabled={!isOwner}
              onClick={handleDelete}
              variant="red"
            >
              Delete
            </Button>
          </Box>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Controls;
