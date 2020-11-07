// * Hooks
import useTweet from "@hooks/use-tweet";

// * Modulz
import { Avatar, Flex, Text } from "@modulz/radix";
import { Cross2Icon } from "@modulz/radix-icons";

interface UnrequestedProps {
  team: any;
  tweet: any;
  user: any;
}

const Unrequested = ({ team, tweet, user }: UnrequestedProps) => {
  const { setTweet } = useTweet(tweet.twuid);

  // * Request approval from user
  const handleRequestApproval = async () => {
    const url = "/api/approvals/request";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        campaign: tweet.campaign,
        email: user.email,
        name: user.name,
        team: team.handle,
        twuid: tweet.twuid,
        uid: user.uid,
      }),
    });
    if (res.status === 200) {
      const tweet = await res.json();
      setTweet(tweet);
    }
  };

  return (
    <Flex
      sx={{ alignItems: "center", justifyContent: "space-between" }}
      onClick={handleRequestApproval}
    >
      <Flex sx={{ alignItems: "center" }}>
        <Avatar
          alt={user.name}
          sx={{ height: 20, width: 20 }}
          mr={1}
          src={user.picture}
        />
        <Text as="p">{user.name}</Text>
      </Flex>
      <Cross2Icon style={{ cursor: "pointer" }} />
    </Flex>
  );
};

export default Unrequested;
