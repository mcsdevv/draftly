// * Modulz
import { Container, Divider, Flex, Heading } from "@modulz/radix";

// * Components
import Footer from "@components/footer";
import Header from "@components/header/dashboard";
import RequireLogin from "@lib/client/requireLogin";

interface DashboardLayoutProps {
  children: React.ReactNode;
  name: string;
}

const DashboardLayout = ({ children, name }: DashboardLayoutProps) => (
  <RequireLogin>
    <Container
      mb={8}
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      size={3}
    >
      <Header />
      <Flex sx={{ justifyContent: "space-between" }}>
        <Heading size={5} weight="medium">
          {name}
        </Heading>
      </Flex>
      <Divider mb={4} />
      <Flex sx={{ flexGrow: 1 }}>{children}</Flex>
    </Container>
    <Footer />
  </RequireLogin>
);

export default DashboardLayout;
