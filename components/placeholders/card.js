import { Box, Icon } from "@chakra-ui/core";

export default function CardPlaceholder() {
  return (
    <Box
      as="article"
      border="1px solid rgb(230, 236, 240)"
      display="flex"
      py="10px"
      px="15px"
      w="100%"
    >
      <Box bg="#444" h="48px" marginRight="5px" rounded="50%" w="48px" />
      <Box
        as="section"
        display="flex"
        flexDirection="column"
        fontSize="15px"
        marginLeft="5px"
      >
        <Box display="flex" mb="8px">
          <Box bg="#444" h="24px" mr="4px" w="96px" />
          <Box bg="#444" h="24px" mr="4px" w="24px" />
          <Box bg="#444" h="24px" mr="4px" w="96px" />
          <Box bg="#444" h="24px" mr="4px" w="32px" />
          <Icon
            name="arrow"
            color="rgb(101, 119, 134)"
            marginLeft="auto"
            w="15px"
          />
        </Box>
        <Box h="64px" w="500px">
          <Box bg="#444" h="24px" mb="8px" w="512px" />
          <Box bg="#444" h="24px" w="512px" />
        </Box>
        <Box
          border="1px solid rgb(204, 214, 221)"
          marginTop="10px"
          rounded="14px"
        >
          <Box
            bg="#444"
            borderBottom="1px solid rgb(204, 214, 221)"
            h="265px"
            roundedTop="14px"
          />
          <Box p="10px">
            <Box bg="#444" w="32px" />
            <Box h="64px" w="500px">
              <Box bg="#444" h="24px" mb="8px" w="496px" />
              <Box bg="#444" h="24px" w="496px" />
            </Box>
            <Box bg="#444" h="24px" w="128px" />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          lineHeight="19.75px"
          marginTop="10px"
          maxW="425px"
        >
          <Icon
            name="comment"
            color="rgb(101, 119, 134)"
            h="16.75px"
            w="16.75px"
          />
          <Icon
            name="retweet"
            color="rgb(101, 119, 134)"
            h="16.75px"
            w="16.75px"
          />
          <Icon
            name="like"
            color="rgb(101, 119, 134)"
            h="16.75px"
            w="16.75px"
          />
          <Icon
            name="share"
            color="rgb(101, 119, 134)"
            h="16.75px"
            w="16.75px"
          />
          <Icon
            name="stats"
            color="rgb(101, 119, 134)"
            h="16.75px"
            w="16.75px"
          />
        </Box>
      </Box>
    </Box>
  );
}
