// * Hooks
import useTweets from "@hooks/use-tweets";
import useUser from "@hooks/use-user";

// * Modulz
import { Heading, List, ListItem, Text } from "@modulz/radix";

// * Components
import DashboardLayout from "@components/layouts/dashboard";

function Dashboard() {
  const { drafts, published } = useTweets();
  const { user } = useUser();
  return (
    <>
      <Heading size={3}>
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
    </>
  );
}

Dashboard.getLayout = (page) => (
  <DashboardLayout name="Dashboard">{page}</DashboardLayout>
);

export default Dashboard;
