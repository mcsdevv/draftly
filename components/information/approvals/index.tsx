// * Modulz
import { Box, Grid, Subheading } from "@modulz/radix";

// * Components
import Approved from "@components/information/approvals/approved";
import Requested from "@components/information/approvals/requested";
import Unrequested from "@components/information/approvals/unrequested";

interface ReviewsProps {
  approved: any[];
  requested: any[];
  unrequested: any[];
  twuid: string;
}

const Approvals = ({
  approved,
  requested,
  unrequested,
  twuid,
}: ReviewsProps) => {
  return (
    <Grid mb={4} sx={{ gap: 20, gridTemplateColumns: "1fr 1fr" }}>
      <Box>
        <Subheading mb={1}>Requested Approvals</Subheading>
        {requested.map((r) => (
          <Requested key={r.uid} user={r.user} />
        ))}
        {unrequested.map((u) => (
          <Unrequested key={u.uid} user={u.user} twuid={twuid} />
        ))}
      </Box>
      <Box>
        <Subheading mb={1}>Approved By</Subheading>
        {approved.map((a) => (
          <Approved key={a.uid} user={a.user} />
        ))}
      </Box>
    </Grid>
  );
};

export default Approvals;
