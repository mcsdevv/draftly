import Linkify from "react-linkify";

import { Box, Link, Textarea } from "@chakra-ui/core";
import CardTop from "../sections/top";
import CardBottom from "../sections/bottom";
import Characters from "../sections/characters";

export default function Text({
  editing,
  editTweet,
  handleOnChange,
  scope,
  text
}) {
  return (
    <Box
      as="section"
      display="flex"
      flexDirection="column"
      fontSize="15px"
      marginLeft="5px"
      w="100%"
    >
      <CardTop handle={scope.handle} name={scope.name} />
      <Link width="501px">
        <Linkify
          properties={{
            target: "_blank",
            style: { color: "red", fontWeight: "bold" }
          }}
        >
          {!editing ? (
            text
          ) : (
            <Textarea onChange={handleOnChange} value={editTweet} />
          )}
        </Linkify>
      </Link>
      {editing && <Characters tweet={editTweet} />}
      <CardBottom />
    </Box>
  );
}
