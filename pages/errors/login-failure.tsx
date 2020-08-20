// * Components
import Error from "@components/layouts/content/error";
import MarketingLayout from "@components/layouts/pages/marketing";

function LoginFailure() {
  // * Format error text
  const text = `There was an error processing your login, please trying logging in again.`;

  // * Format error title
  const title = "Login Failure";
  return <Error text={text} title={title} />;
}

LoginFailure.getLayout = (page: React.ReactNode) => (
  <MarketingLayout name="Error">{page}</MarketingLayout>
);

export default LoginFailure;
