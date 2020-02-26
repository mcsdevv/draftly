import Linkify from "react-linkify";

import { Box, CircularProgress, Textarea } from "@chakra-ui/core";
import CardTop from "../card/top";
import CardBottom from "../card/bottom";

export default function Text({
  editing,
  editTweet,
  handleOnChange,
  scope,
  text
}) {
  return (
    <>
      <Box
        as="section"
        display="flex"
        flexDirection="column"
        fontSize="15px"
        marginLeft="5px"
        w="100%"
      >
        <CardTop handle={scope.handle} name={scope.name} />
        <p className="card-text">
          <Linkify
            properties={{
              target: "_blank",
              style: { color: "red", fontWeight: "bold" }
            }}
          >
            {!editing ? (
              text
            ) : (
              <>
                <Textarea onChange={handleOnChange} value={editTweet} />
                <Box
                  height="0px"
                  marginLeft="auto"
                  marginRight="2"
                  position="relative"
                  top="-24px"
                  width="fit-content"
                >
                  <CircularProgress
                    size="md"
                    value={(editTweet.length / 280) * 100}
                  />
                </Box>
              </>
            )}
          </Linkify>
        </p>
        <CardBottom />
      </Box>
      <style jsx>{`
        .card-text {
          width: 501px;
        }
        .card-text :global(a) {
          color: rgb(27, 149, 224);
          font-size: 15px;
          text-decoration: none;
        }
        .card-text :global(a:hover) {
          text-decoration: underline;
        }
        .card-text :global(a:visited) {
          color: rgb(27, 149, 224);
        }
      `}</style>
    </>
  );
}
