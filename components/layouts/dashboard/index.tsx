// * Modulz
import { Container, Divider, Flex, Heading } from "@modulz/radix";

// * Components
import Header from "@components/header/dashboard";
import RequireLogin from "@lib/client/requireLogin";

interface DashboardLayoutProps {
  children: React.ReactNode;
  name: string;
}

const DashboardLayout = ({ children, name }: DashboardLayoutProps) => (
  <RequireLogin>
    <Container size={3}>
      <Header />
      <Flex sx={{ justifyContent: "space-between" }}>
        <Heading size={5} weight="medium">
          {name}
        </Heading>
      </Flex>
      <Divider mb={4} />
      {children}
    </Container>
  </RequireLogin>
);

export default DashboardLayout;
