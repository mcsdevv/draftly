// * Modulz
import { Button, Flex, Heading } from "@modulz/radix";

function Login() {
  const redirectToLogin = () => {
    window.location.href = "/api/auth/login";
  };
  redirectToLogin();
  return (
    <Flex
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Heading as="h2" mb={4} size={5}>
        Logging Authentication Provider ...
      </Heading>
      <Button isWaiting={true} size={1}>
        Longer than usual login text.
      </Button>
    </Flex>
  );
}

export default Login;
