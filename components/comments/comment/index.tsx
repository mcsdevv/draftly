// * Libraries
import ago from "s-ago";

// * Modulz
import { Avatar, Container, Flex, IconButton, Text } from "@modulz/radix";
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
    sx={{
      flex: 0,
      margin: "8px 0 0 0",
      maxWidth: "100%",
      padding: 0,
      width: "100%",
    }}
    mb={4}
  >
    <Flex>
      <Text as="p" sx={{ width: "100%" }}>
        {comment}
      </Text>
      <div>
        <Avatar src={avatar} />
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
      <IconButton sx={{ cursor: "pointer" }} onClick={handleDeleteComment}>
        <TrashIcon type="twoTone" />
      </IconButton>
    </Flex>
  </Container>
);

export default Comment;
