import { Box, Heading, Image } from "@chakra-ui/core";
import { Trash2 } from "react-feather";
import ago from "s-ago";

export default function Comment({
  addedAt,
  addedBy,
  avatar,
  comment,
  handleDeleteComment
}) {
  return (
    <Box mb="8">
      <Box display="flex">
        <Box w="100%">{comment}</Box>
        <Box>
          <Image borderRadius="50%" src={avatar} w="49px" />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" marginTop="2">
        <Heading
          as="h5"
          color="#777"
          fontSize="12px"
          fontWeight="300"
          size="xs"
        >
          {addedBy} - {ago(new Date(addedAt))}
        </Heading>
        <Box
          as={Trash2}
          cursor="pointer"
          onClick={handleDeleteComment}
          strokeWidth="1px"
        />
      </Box>
    </Box>
  );
}
