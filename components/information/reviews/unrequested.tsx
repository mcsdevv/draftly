// * Modulz
import { Flex, Text } from "@modulz/radix";
import { Cross2Icon } from "@modulz/radix-icons";

interface UnrequestedProps {
  user: any;
}

const Unrequested = ({ user }: UnrequestedProps) => {
  return (
    <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
      <Text as="p">{user.name}</Text>
      <Cross2Icon />
    </Flex>
  );
};

export default Unrequested;
