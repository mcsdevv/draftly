import { Box, Heading, Image } from "@chakra-ui/core";
import { Trash2 } from "react-feather";

export default function Comment({
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
          {addedBy}
        </Heading>
        <Trash2 onClick={handleDeleteComment} />
      </Box>
    </Box>
  );
}

// .avatar {
//     height: 100%;
//     margin-right: 5px;
//   }
//   img {
//     margin-right: 2px;
//     max-width: 50px;
//   }
