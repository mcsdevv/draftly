// * Modulz
import { Flex, Text } from "@modulz/radix";
import { UpdateIcon } from "@modulz/radix-icons";

interface ApprovedProps {
  user: any;
}

const Approved = ({ user }: ApprovedProps) => {
  return (
    <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
      <Text as="p">{user.name}</Text>
      <UpdateIcon style={{ height: 12, width: 12 }} />
    </Flex>
  );
};

export default Approved;
