// * Libraries
import ago from "s-ago";

// * Modulz
import { Box, Divider, Flex, Grid, Subheading, Text } from "@modulz/radix";
import { CheckIcon, Cross2Icon, UpdateIcon } from "@modulz/radix-icons";

interface InformationProps {
  approvedBy: string[];
  createdAt: Date;
  createdBy: string;
  lastUpdated: Date;
  reviewsRequired: number;
}

const Information = ({
  approvedBy,
  createdAt,
  createdBy,
  lastUpdated,
  reviewsRequired,
}: InformationProps) => {
  return (
    <Box>
      <Grid mb={4} sx={{ gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <Box>
          <Subheading>Created By</Subheading>
          <Text>{createdBy}</Text>
        </Box>
        <Box>
          <Subheading>Created At</Subheading>
          <Text>{ago(new Date(createdAt))}</Text>
        </Box>
      </Grid>
      <Grid mb={4} sx={{ gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <Box>
          <Subheading>Reviews Required</Subheading>
          <Text>{reviewsRequired}</Text>
        </Box>
        <Box>
          <Subheading>Last Updated</Subheading>
          <Text>{ago(new Date(lastUpdated))}</Text>
        </Box>
      </Grid>
      <Divider mb={4} />
      <Grid mb={4} sx={{ gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <Box>
          <Subheading mb={1}>Requested Reviews</Subheading>
          <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Text as="p">Michael Derps</Text>
            <Flex sx={{ alignItems: "center" }}>
              <Box mr={1}>
                <UpdateIcon style={{ height: 12, width: 12 }} />
              </Box>
              <CheckIcon />
            </Flex>
          </Flex>
          <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Text as="p">Jonboy Jones</Text>
            <Flex sx={{ alignItems: "center" }}>
              <Box mr={1}>
                <UpdateIcon style={{ height: 12, width: 12 }} />
              </Box>
              <CheckIcon />
            </Flex>
          </Flex>
          <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Text as="p">Bitty Cat</Text>
            <Cross2Icon />
          </Flex>
          <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Text as="p">Wee Maki</Text>
            <Cross2Icon />
          </Flex>
          <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Text as="p">Dufty Woo</Text>
            <Cross2Icon />
          </Flex>
        </Box>
        <Box>
          <Subheading mb={1}>Approved By</Subheading>
          <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Text as="p">Michael Derps</Text>
            <Flex sx={{ alignItems: "center" }}>
              <Box mr={1}>
                <UpdateIcon style={{ height: 12, width: 12 }} />
              </Box>
              <CheckIcon />
            </Flex>
          </Flex>
          <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Text as="p">Jonboy Jones</Text>
            <Cross2Icon />
          </Flex>
        </Box>
      </Grid>
    </Box>
  );
};

export default Information;
