// * Hooks
import useTweet from "@hooks/use-tweet";

// * Modulz
import { Avatar, Flex, Text } from "@modulz/radix";
import { Cross2Icon } from "@modulz/radix-icons";

interface UnrequestedProps {
  user: any;
  twuid: string;
}

const Unrequested = ({ user, twuid }: UnrequestedProps) => {
  const { setTweet } = useTweet(twuid);

  // * Request approval from user
  const handleRequestApproval = async () => {
    const url = "/api/approvals/request";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        uid: user.uid,
        twuid,
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
