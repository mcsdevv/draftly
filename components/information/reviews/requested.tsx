// * Modulz
import { Box, Flex, Text } from "@modulz/radix";
import { CheckIcon, UpdateIcon } from "@modulz/radix-icons";

interface RequestedProps {
  user: any;
}

const Requested = ({ user }: RequestedProps) => {
  return (
    <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
      <Text as="p">{user.name}</Text>
      <Flex sx={{ alignItems: "center" }}>
        <Box mr={1}>
          <UpdateIcon style={{ height: 12, width: 12 }} />
        </Box>
        <CheckIcon />
      </Flex>
    </Flex>
  );
};

export default Requested;
