import { Box, Icon } from "@chakra-ui/core";

export default function CardBottom() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      lineHeight="19.75px"
      marginTop="10px"
      maxW="425px"
    >
      <Icon name="comment" color="rgb(101, 119, 134)" h="16.75px" w="16.75px" />
      <Icon name="retweet" color="rgb(101, 119, 134)" h="16.75px" w="16.75px" />
      <Icon name="like" color="rgb(101, 119, 134)" h="16.75px" w="16.75px" />
      <Icon name="share" color="rgb(101, 119, 134)" h="16.75px" w="16.75px" />
      <Icon name="stats" color="rgb(101, 119, 134)" h="16.75px" w="16.75px" />
    </Box>
  );
}
