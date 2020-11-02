// * Libraries
import ago from "s-ago";
import { useMemo } from "react";

// * Modulz
import { Box, Divider, Grid, Subheading, Text } from "@modulz/radix";

// * Components
import Reviews from "@components/information/reviews";

interface InformationProps {
  approvals: any[];
  createdAt: Date;
  createdBy: string;
  lastUpdated: Date;
  members: any[];
  reviewsRequired: number;
}

const Information = ({
  approvals,
  createdAt,
  createdBy,
  lastUpdated,
  members,
  reviewsRequired,
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
      <Reviews
        approved={approved}
        requested={requested}
        unrequested={unrequested}
      />
    </Box>
  );
};

export default Information;
