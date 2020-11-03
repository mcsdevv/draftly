// * Modulz
import { Avatar, Box, Flex, Text } from "@modulz/radix";
import { CheckIcon, UpdateIcon } from "@modulz/radix-icons";

interface RequestedProps {
  user: any;
}

const Requested = ({ user }: RequestedProps) => {
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
          <UpdateIcon style={{ cursor: "pointer", height: 12, width: 12 }} />
        </Box>
        <CheckIcon style={{ cursor: "pointer" }} />
      </Flex>
    </Flex>
  );
};

export default Requested;
