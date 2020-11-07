// * Modulz
import { Avatar, Box, Flex, Text } from "@modulz/radix";
import { CheckIcon, UpdateIcon } from "@modulz/radix-icons";

interface RequestedProps {
  team: any;
  tweet: any;
  user: any;
}

const Requested = ({ team, tweet, user }: RequestedProps) => {
  // * Send a reminder for the approval
  const handleApprovalReminder = async () => {
    const url = "/api/approvals/remind";
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
      // TODO Toast time
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
      <Flex sx={{ alignItems: "center" }}>
        <Box mr={1}>
          <UpdateIcon
            onClick={handleApprovalReminder}
            style={{ cursor: "pointer", height: 12, width: 12 }}
          />
        </Box>
        <CheckIcon style={{ cursor: "pointer" }} />
      </Flex>
    </Flex>
  );
};

export default Requested;
