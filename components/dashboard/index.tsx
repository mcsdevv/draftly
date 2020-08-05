// * Hooks
import useTweets from "@hooks/use-tweets";
import useUser from "@hooks/use-user";

// * Modulz
import { Box, Heading, List, ListItem, Text } from "@modulz/radix";

function Dashboard() {
  const { drafts, published } = useTweets();
  const { user } = useUser();
  return (
    <Box>
      <Heading as="h2" size={3}>
        Hello {user?.name}, here are some stats for you:
      </Heading>
      <List mt={4}>
        <ListItem>
          <Text>- {drafts?.length} drafts to complete.</Text>
        </ListItem>
        <ListItem>
          <Text>- {published?.length} tweets published so far.</Text>
        </ListItem>
      </List>
    </Box>
  );
}

export default Dashboard;
