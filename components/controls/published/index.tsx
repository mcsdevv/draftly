// * Libraries
import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/router";

// * Hooks
import useScope from "@hooks/use-scope";
import useTweet from "@hooks/use-tweet";
import useUser from "@hooks/use-user";

// * Modulz
import { Box, Button, Flex, Tooltip } from "@modulz/radix";

const Controls = () => {
  // * Box component surrounds buttons to allow for tooltips to be shown on disabled button.
  // * Initialize hooks
  const { scope } = useScope();
  const router = useRouter();
  const { user } = useUser();

  // * Get twuid from route query
  const { twuid } = router.query;

  // * Get tweet from twuid
  const { tweet } = useTweet(twuid?.toString());

  const handleCopy = () => {
    console.log("Copied");
  };

  const handleDelete = () => {
    console.log("Modal?");
  };

  const handleRefresh = () => {
    console.log("Modal?");
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
            <Link
              href={`https://twitter.com/${scope.handle}/status/${tweet.tweetId}`}
            >
              <Button sx={{ cursor: "pointer", width: 100 }}>View</Button>
            </Link>
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
