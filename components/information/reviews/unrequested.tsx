// * Modulz
import { Avatar, Flex, Text } from "@modulz/radix";
import { Cross2Icon } from "@modulz/radix-icons";

interface UnrequestedProps {
  user: any;
}

const Unrequested = ({ user }: UnrequestedProps) => {
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
      <Cross2Icon />
    </Flex>
  );
};

export default Unrequested;
