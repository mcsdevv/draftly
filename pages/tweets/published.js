import { useContext } from "react";
import { useProfile, usePublished } from "../../hooks";

import RequireLogin from "../../lib/requireLogin";

import { Box, Grid, Heading } from "@chakra-ui/core";

function Published() {
  const { user } = useProfile();
  const { published } = usePublished();
  console.log(published);
  return (
    <Grid templateColumns="repeat(2, 1fr)" templateRows="700px">
      {published && published.length > 0 ? (
        published.map(d => (
          <Box alignSelf="center" justifySelf="center" key={d.ref}>
            {d.toString()}
          </Box>
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
