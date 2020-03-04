import { useProfile, usePublished } from "../../hooks";

import RequireLogin from "../../lib/requireLogin";

import { Box, Grid, Heading } from "@chakra-ui/core";
import Publish from "../../components/tweets/publish";

function Published() {
  const { user } = useProfile();
  const { published } = usePublished();
  console.log(!!published);
  return (
    <Grid templateColumns="repeat(2, 1fr)" templateRows="700px">
      {published ? (
        published.map(p => (
          <>
            <Box alignSelf="center" justifySelf="center" key={p.ref}>
              <Publish published={published} tweet={p} />
            </Box>
            <Box
              alignSelf="center"
              justifySelf="center"
              key={p.ref + 1}
              w="100%"
            >
              stats...
            </Box>
          </>
        ))
      ) : (
        <Heading as="h2">
          {/* {showLoading && "Loading drafts..."}
          {showNoDrafts && "No drafts..."} */}
          nout published
        </Heading>
      )}
    </Grid>
  );
}

export default () => RequireLogin(Published);
