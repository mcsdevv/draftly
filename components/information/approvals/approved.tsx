// * Modulz
import { Avatar, Flex, Text } from "@modulz/radix";
import { UpdateIcon } from "@modulz/radix-icons";

interface ApprovedProps {
  user: any;
}

const Approved = ({ user }: ApprovedProps) => {
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
      <UpdateIcon style={{ cursor: "pointer", height: 12, width: 12 }} />
    </Flex>
  );
};

export default Approved;
