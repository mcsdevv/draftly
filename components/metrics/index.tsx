// * Libraries
import { useEffect, useState } from "react";

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
  handleDelete: () => void;
  tweet: any;
  twuid: string;
}

const Metrics = ({ handleDelete, tweet, twuid }: MetricsProps) => {
  const [likes, setLikes] = useState(0);
  const [replies, setReplies] = useState(0);
  const [retweets, setRetweets] = useState(0);

  useEffect(() => {
    getMetrics();
  }, []);

  const getMetrics = async () => {
    console.log("getting metrics", twuid);
    const url = "/api/tweet/published/metrics";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ tweet_id: tweet.tweet_id, twuid }),
    });
    const resJson = await res.json();
    console.log("METRICS", resJson);
    // * Get likes and retweets
    // * Set likes and retweets
    setLikes(likes);
    setReplies(replies);
    setRetweets(retweets);
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
          <Subheading mb={5} size={0}>
            Favorites
          </Subheading>
          <Subheading size={0}>Retweets</Subheading>
        </Flex>
        <Flex
          mr={4}
          sx={{ flexDirection: "column", textAlign: "center", width: "120px" }}
        >
          <Text mb={4}>{likes}</Text>
          <Text>{retweets}</Text>
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