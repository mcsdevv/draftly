// * Modulz
import { Flex, Heading, List, ListItem, Text } from "@modulz/radix";

// * Components
import MarketingLayout from "@components/layouts/pages/marketing";

function Terms() {
  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Heading as="h2" my={2} size={4}>
        1. Terms
      </Heading>
      <Text as="p" mb={4}>
        By accessing the website at https://draftly.app, you are agreeing to be
        bound by these terms of service, all applicable laws and regulations,
        and agree that you are responsible for compliance with any applicable
        local laws. If you do not agree with any of these terms, you are
        prohibited from using or accessing this site. The materials contained in
        this website are protected by applicable copyright and trademark law.
      </Text>
      <Heading as="h2" my={2} size={4}>
        2. Use Licence
      </Heading>
      <Text as="p" mb={4}>
        Permission is granted to temporarily download one copy of the materials
        (information or software) on Draftly's website for personal,
        non-commercial transitory viewing only. This is the grant of a licence,
        not a transfer of title, and under this licence you may not:
      </Text>
      <List>
        <ListItem>Modify or copy the materials;</ListItem>
        <ListItem>
          Use the materials for any commercial purpose, or for any public
          display (commercial or non-commercial);
        </ListItem>
        <ListItem>
          Attempt to decompile or reverse engineer any software contained on
          Draftly's website;
        </ListItem>
        <ListItem>
          Remove any copyright or other proprietary notations from the
          materials; or
        </ListItem>
        <ListItem mb={4}>
          Transfer the materials to another person or "mirror" the materials on
          any other server.
        </ListItem>
      </List>
      <Text as="p" mb={4}>
        This licence shall automatically terminate if you violate any of these
        restrictions and may be terminated by Draftly at any time. Upon
        terminating your viewing of these materials or upon the termination of
        this licence, you must destroy any downloaded materials in your
        possession whether in electronic or printed format.
      </Text>
      <Heading as="h2" my={2} size={4}>
        3. Disclaimer
      </Heading>
      <Text as="p" mb={4}>
        The materials on Draftly's website are provided on an 'as is' basis.
        Draftly makes no warranties, expressed or implied, and hereby disclaims
        and negates all other warranties including, without limitation, implied
        warranties or conditions of merchantability, fitness for a particular
        purpose, or non-infringement of intellectual property or other violation
        of rights.
      </Text>
      <Text as="p" mb={4}>
        Further, Draftly does not warrant or make any representations concerning
        the accuracy, likely results, or reliability of the use of the materials
        on its website or otherwise relating to such materials or on any sites
        linked to this site.
      </Text>
      <Heading as="h2" my={2} size={4}>
        4. Limitations
      </Heading>
      <Text as="p" mb={4}>
        In no event shall Draftly or its suppliers be liable for any damages
        (including, without limitation, damages for loss of data or profit, or
        due to business interruption) arising out of the use or inability to use
        the materials on Draftly's website, even if Draftly or a Draftly
        authorised representative has been notified orally or in writing of the
        possibility of such damage. Because some jurisdictions do not allow
        limitations on implied warranties, or limitations of liability for
        consequential or incidental damages, these limitations may not apply to
        you.
      </Text>
      <Heading as="h2" my={2} size={4}>
        5. Accuracy of materials
      </Heading>
      <Text as="p" mb={4}>
        The materials appearing on Draftly's website could include technical,
        typographical, or photographic errors. Draftly does not warrant that any
        of the materials on its website are accurate, complete or current.
        Draftly may make changes to the materials contained on its website at
        any time without notice. However Draftly does not make any commitment to
        update the materials.
      </Text>
      <Heading as="h2" my={2} size={4}>
        6. Links
      </Heading>
      <Text as="p" mb={4}>
        Draftly has not reviewed all of the sites linked to its website and is
        not responsible for the contents of any such linked site. The inclusion
        of any link does not imply endorsement by Draftly of the site. Use of
        any such linked website is at the user's own risk.
      </Text>
      <Heading as="h2" my={2} size={4}>
        7. Modifications
      </Heading>
      <Text as="p" mb={4}>
        Draftly may revise these terms of service for its website at any time
        without notice. By using this website you are agreeing to be bound by
        the then current version of these terms of service.
      </Text>
      <Heading as="h2" my={2} size={4}>
        8. Governing Law
      </Heading>
      <Text as="p" mb={4}>
        These terms and conditions are governed by and construed in accordance
        with the laws of the United Kingdom and you irrevocably submit to the
        exclusive jurisdiction of the courts in that State or location.
      </Text>
    </Flex>
  );
}

Terms.getLayout = (page: React.ReactNode) => (
  <MarketingLayout name="Terms of Service">{page}</MarketingLayout>
);

export default Terms;
