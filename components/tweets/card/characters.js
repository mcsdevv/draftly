import { Box, CircularProgress } from "@chakra-ui/core";

export default function Characters({ tweet }) {
  return (
    <Box
      height="0px"
      marginLeft="auto"
      marginRight="2"
      top="-24px"
      position="relative"
      width="fit-content"
    >
      <CircularProgress size="md" value={(tweet.length / 280) * 100} />
    </Box>
  );
}
