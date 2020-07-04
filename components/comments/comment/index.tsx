// * Libraries
import ago from "s-ago";

// * Modulz
import { Container, Flex, IconButton, Image, Text } from "@modulz/radix";
import { TrashIcon } from "@modulz/radix-icons";

interface CommentProps {
  addedAt: string;
  addedBy: string;
  avatar: string;
  comment: string;
  handleDeleteComment: () => void;
}

const Comment = ({
  addedAt,
  addedBy,
  avatar,
  comment,
  handleDeleteComment,
}: CommentProps) => (
  <Container
    sx={{ margin: 0, maxWidth: "100%", padding: 0, width: "100%" }}
    mb={4}
  >
    <Flex>
      <Text as="p" sx={{ width: "100%" }}>
        {comment}
      </Text>
      <div>
        <Image sx={{ borderRadius: "50%", width: "49px" }} src={avatar} />
      </div>
    </Flex>
    <Flex
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
      mt={4}
    >
      <Text
        as="span"
        sx={{
          color: "gray600",
          fontWeight: "300",
        }}
        size={2}
      >
        {addedBy} - {ago(new Date(addedAt))}
      </Text>
      <IconButton onClick={handleDeleteComment}>
        <TrashIcon />
      </IconButton>
    </Flex>
  </Container>
);

export default Comment;
