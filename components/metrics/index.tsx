// * Libraries
import ago from "s-ago";
import { useEffect } from "react";

// * Modulz
import {
  Button,
  Card,
  Divider,
  Flex,
  Heading,
  Option,
  Select,
  Subheading,
  Text,
} from "@modulz/radix";

interface MetricsProps {
  drafts: any;
  handleDelete: () => void;
  published: any;
  setTweets: (...args: any) => void;
  tweet: any;
  twuid: string;
}

const Metrics = ({
  drafts,
  handleDelete,
  published,
  setTweets,
  tweet,
  twuid,
}: MetricsProps) => {
  // * Update metrics on page load, serve stale until then
  useEffect(() => {
    getMetrics();
  }, []);

  // * Gets metrics for the specified tweet and mutates SWR
  const getMetrics = async () => {
    console.log("getting metrics", twuid);
    const url = "/api/tweet/published/metrics";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ tweet_id: tweet.tweet_id, twuid }),
    });
    if (res.status === 200) {
      const resJson = await res.json();
      const updatedPublished = published.map((p: any) => {
        if (p.twuid === twuid) {
          return { ...p, ...resJson };
        }
        return p;
      });
      setTweets({ drafts, published: updatedPublished });
    }
  };

  return (
    <Card sx={{ width: "100%" }} mt={4}>
      <Heading as="h2" size={4}>
        Metrics
      </Heading>
      <Divider mb={2} />
      <Flex
        sx={{
          paddingTop: "16px",
        }}
      >
        <Flex mr={4} sx={{ flexDirection: "column" }}>
          <Subheading mb={5}>Select Theme</Subheading>
          <Select value="default" sx={{ width: "120px" }}>
            <Option label="Default" value="default" />
            <Option label="Dim" value="dim" />
            <Option label="Lights Out" value="lights-out" />
          </Select>
        </Flex>
        <Flex mr={4} sx={{ flexDirection: "column", width: "120px" }}>
          <Flex mb={5} sx={{ justifyContent: "space-between" }}>
            <Subheading size={0}>Favorites</Subheading>
            <Subheading size={0}>{tweet.favorites}</Subheading>
          </Flex>
          <Flex sx={{ justifyContent: "space-between" }}>
            <Subheading size={0}>Retweets</Subheading>
            <Subheading size={0}>{tweet.retweets}</Subheading>
          </Flex>
        </Flex>
        <Flex
          mr={4}
          sx={{ flexDirection: "column", textAlign: "center", width: "120px" }}
        >
          <Flex mb={5} sx={{ justifyContent: "space-between" }}>
            <Subheading size={0}>Replies</Subheading>
            <Subheading size={0}>{tweet.replies}</Subheading>
          </Flex>
          <Flex sx={{ justifyContent: "space-between" }}>
            <Subheading size={0}>
              {ago(new Date(tweet.metrics_updated_at))}
            </Subheading>
          </Flex>
        </Flex>
        <Flex sx={{ flexDirection: "column" }}>
          <Button
            sx={{ cursor: "pointer", width: "120px" }}
            mb={4}
            onClick={getMetrics}
          >
            Refresh Metrics
          </Button>
          <Button
            sx={{ cursor: "pointer" }}
            onClick={handleDelete}
            variant="red"
          >
            Delete Live Tweet
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Metrics;
