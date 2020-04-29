import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";

import { Box, Image } from "@chakra-ui/core";
import Card from "../card";

export default function Publish({ revalidate, reviews, tweet }) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet.text);
  const [saving, setSaving] = useState(false);
  const { scope } = useContext(ScopeContext);
  const { user, teams } = useProfile();
  const getStateMessage = () => {
    if (deleting) return <h2>Deleting review...</h2>;
    if (saving) return <h2>Saving draft...</h2>;
  };
  // TODO Account for multiple Twitter card types - https://www.oncrawl.com/oncrawl-seo-thoughts/a-complete-guide-to-twitter-cards/
  return (
    <Box display="flex" flexDirection="column" alignItems="center" maxW="598px">
      {!deleting && !saving ? (
        <>
          <Box
            as="article"
            border="1px solid rgb(230, 236, 240)"
            display="flex"
            py="10px"
            px="15px"
            w="100%"
          >
            <Box h="100%" marginRight="5px">
              <Image
                borderRadius="50%"
                marginRight="2px"
                maxW="49px"
                src={scope.avatar}
                w="49px"
              />
            </Box>
            <Card
              editing={editing}
              editTweet={tweet}
              metadata={tweet.metadata}
              scope={scope}
              text={tweet.text}
            />
          </Box>
        </>
      ) : (
        <Box alignItems="center" display="flex" h="500px">
          {getStateMessage()}
        </Box>
      )}
    </Box>
  );
}
