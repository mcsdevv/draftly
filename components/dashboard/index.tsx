// * Hooks
import useTweets from "@hooks/use-tweets";
import useUser from "@hooks/use-user";

// * Components
import Link from "@components/link";

// * Modulz
import { Box, Flex, Heading, List, ListItem, Text } from "@modulz/radix";

function Dashboard() {
  const { drafts, published } = useTweets();
  const { user, teams } = useUser();
  return teams ? (
    teams.length ? (
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
    ) : (
      <Flex
        sx={{
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
        mx="auto"
      >
        <Heading as="h2" mb={4} mt={-64} size={3}>
          Get started by adding a new team.
        </Heading>
        <Link href="/api/auth/twitter/connect" noMargin width="120px">
          + Add New Team
        </Link>
      </Flex>
    )
  ) : null;
}

export default Dashboard;
