// * Modulz
import { Flex, Text } from "@modulz/radix";

// * Components
import MarketingLayout from "@components/layouts/pages/marketing";

function Privacy() {
  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Text as="p" mb={4}>
        Your privacy is important to us. It is Draftly's policy to respect your
        privacy regarding any information we may collect from you across our
        website, https://draftly.app, and other sites we own and operate.
      </Text>
      <Text as="p" mb={4}>
        We only ask for personal information when we truly need it to provide a
        service to you. We collect it by fair and lawful means, with your
        knowledge and consent. We also let you know why we’re collecting it and
        how it will be used.
      </Text>
      <Text as="p" mb={4}>
        We only retain collected information for as long as necessary to provide
        you with your requested service. What data we store, we’ll protect
        within commercially acceptable means to prevent loss and theft, as well
        as unauthorised access, disclosure, copying, use or modification.
      </Text>
      <Text as="p" mb={4}>
        We don’t share any personally identifying information publicly or with
        third-parties, except when required to by law.
      </Text>
      <Text as="p" mb={4}>
        Our website may link to external sites that are not operated by us.
        Please be aware that we have no control over the content and practices
        of these sites, and cannot accept responsibility or liability for their
        respective privacy policies.
      </Text>
      <Text as="p" mb={4}>
        You are free to refuse our request for your personal information, with
        the understanding that we may be unable to provide you with some of your
        desired services.
      </Text>
      <Text as="p" mb={4}>
        Your continued use of our website will be regarded as acceptance of our
        practices around privacy and personal information. If you have any
        questions about how we handle user data and personal information, feel
        free to contact us.
      </Text>
      <Text as="p" mb={4}>
        This policy is effective as of 1 September 2020.
      </Text>
    </Flex>
  );
}

Privacy.getLayout = (page: React.ReactNode) => (
  <MarketingLayout name="Privacy Policy">{page}</MarketingLayout>
);

export default Privacy;
