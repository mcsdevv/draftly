// * Libraries
import ago from "s-ago";
import { useMemo } from "react";

// * Modulz
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  Subheading,
  Text,
} from "@modulz/radix";

// * Components
import Approvals from "@components/information/approvals";

interface InformationProps {
  approvals: any[];
  createdAt: Date;
  createdBy: any;
  lastUpdated: Date;
  members: any[];
  reviewsRequired: number;
  team: any;
  tweet: any;
}

const Information = ({
  approvals,
  createdAt,
  createdBy,
  lastUpdated,
  members,
  reviewsRequired,
  team,
  tweet,
}: InformationProps) => {
  // * All members of the team that have approved
  const approved = useMemo(
    () =>
      members.filter((m) => {
        const approval = approvals.find((a) => a.uid === m.uid);
        if (approval?.state === "approved") return m;
      }),
    [approvals, members]
  );

  // * All members of the team that have been requested to review
  const requested = useMemo(
    () =>
      members.filter((m) => {
        const approval = approvals.find((a) => a.uid === m.uid);
        if (approval?.state === "requested") return m;
      }),
    [approvals, members]
  );

  // * All members of the team that have NOT been requested to review
  const unrequested = useMemo(
    () =>
      members.filter((m) => {
        const approval = approvals.find((a) => a.uid === m.uid);
        if (!approval) return m;
      }),
    [approvals, members]
  );

  return (
    <Box>
      <Grid mb={4} sx={{ gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <Box>
          <Subheading mb={1}>Created By</Subheading>
          <Flex sx={{ alignItems: "center" }}>
            <Avatar
              alt={createdBy.name}
              sx={{ height: 20, width: 20 }}
              mr={1}
              src={createdBy.picture}
            />
            <Text as="p">{createdBy.name}</Text>
          </Flex>
        </Box>
        <Box>
          <Subheading mb={1}>Created At</Subheading>
          <Text>{ago(new Date(createdAt))}</Text>
        </Box>
      </Grid>
      <Grid mb={4} sx={{ gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <Box>
          <Subheading mb={1}>Approvals Required</Subheading>
          <Text>{reviewsRequired}</Text>
        </Box>
        <Box>
          <Subheading mb={1}>Last Updated</Subheading>
          <Text>{ago(new Date(lastUpdated))}</Text>
        </Box>
      </Grid>
      <Divider mb={4} />
      <Approvals
        approved={approved}
        campaign={tweet.campaign}
        requested={requested}
        unrequested={unrequested}
        team={team}
        tweet={tweet}
      />
      <Divider mb={4} />
    </Box>
  );
};

export default Information;
