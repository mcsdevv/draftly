// * Hooks
import useTweet from "@hooks/use-tweet";

// * Modulz
import { Avatar, Flex, Text } from "@modulz/radix";
import { Cross2Icon } from "@modulz/radix-icons";

interface ApprovedProps {
  user: any;
  tauid: string;
  twuid: string;
}

const Approved = ({ user, tauid, twuid }: ApprovedProps) => {
  const { setTweet } = useTweet(twuid);

  console.log(tauid, twuid);

  // * Remove approval a reminder for the approval
  const handleApprovalDelete = async () => {
    const url = "/api/approvals/delete";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        tauid,
        twuid,
        uid: user.uid,
      }),
    });
    if (res.status === 200) {
      const tweet = await res.json();
      setTweet(tweet);
    }
  };
  return (
    <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
      <Flex sx={{ alignItems: "center" }}>
        <Avatar
          alt={user.name}
          sx={{ height: 20, width: 20 }}
          mr={1}
          src={user.picture}
        />
        <Text as="p">{user.name}</Text>
      </Flex>
      <Cross2Icon
        style={{ cursor: "pointer", height: 12, width: 12 }}
        onClick={handleApprovalDelete}
      />
    </Flex>
  );
};

export default Approved;
