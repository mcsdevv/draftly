// * Libraries
import { useState } from "react";
import { useRouter } from "next/router";

// * Hooks
import useScope from "@hooks/use-scope";
import useTweet from "@hooks/use-tweet";

// * Modulz
import { Box, Divider, Flex, Heading } from "@modulz/radix";

// * Components
import Comments from "@components/comments";
import Controls from "@components/controls/published";
import Information from "@components/information/published";
import Tab from "@components/tab";
import Tweet from "@components/tweet";

const PublishedTweet = () => {
  // * Initialize state
  const [tab, setTab] = useState("tweet");

  // * Initialize hooks
  const { scope } = useScope();
  const router = useRouter();

  // * Get twuid from route query
  const { twuid } = router.query;

  // * Get tweet from twuid
  const { tweet } = useTweet(twuid?.toString());

  return tweet ? (
    <Box sx={{ height: "fit-content", width: "100%" }}>
      <Flex sx={{ height: 532, width: "100%" }}>
        <Flex sx={{ flexDirection: "column", width: "100%" }}>
          <Flex mb={4}>
            <Tab
              handleOnClick={() => setTab("tweet")}
              name="Tweet"
              selected={tab === "tweet"}
            />
            <Tab
              handleOnClick={() => setTab("comments")}
              name="Comments"
              selected={tab === "comments"}
            />
          </Flex>
          {tab === "tweet" ? (
            <Flex
              sx={{
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <Information
                createdAt={tweet.createdAt}
                createdBy={tweet.creator}
                tweet={tweet}
              />
              <Controls />
            </Flex>
          ) : (
            <Comments />
          )}
        </Flex>
        <Box ml="16px">
          <Heading as="h2" size={4}>
            {tweet.campaign}
          </Heading>
          <Divider mb={4} />
          <Tweet metadata={tweet.metadata} scope={scope} text={tweet.text} />
        </Box>
      </Flex>
    </Box>
  ) : null;
};

export default PublishedTweet;
