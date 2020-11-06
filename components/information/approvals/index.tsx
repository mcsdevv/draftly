// * Modulz
import { Box, Grid, Subheading } from "@modulz/radix";

// * Components
import Approved from "@components/information/approvals/approved";
import Requested from "@components/information/approvals/requested";
import Unrequested from "@components/information/approvals/unrequested";

interface ReviewsProps {
  approved: any[];
  campaign: string;
  requested: any[];
  unrequested: any[];
  team: any;
  tweet: any;
}

const Approvals = ({
  approved,
  requested,
  unrequested,
  team,
  tweet,
}: ReviewsProps) => {
  return (
    <Grid mb={4} sx={{ gap: 20, gridTemplateColumns: "1fr 1fr" }}>
      <Box>
        <Subheading mb={1}>Requested Approvals</Subheading>
        <Box sx={{ height: 144, overflow: "scroll" }}>
          {requested.map((r) => (
            <Requested key={r.uid} team={team} user={r.user} tweet={tweet} />
          ))}
          {unrequested.map((u) => (
            <Unrequested key={u.uid} user={u.user} twuid={tweet.twuid} />
          ))}
        </Box>
      </Box>
      <Box>
        <Subheading mb={1}>Approved By</Subheading>
        <Box sx={{ height: 144, overflow: "scroll" }}>
          {approved.map((a) => (
            <Approved key={a.uid} user={a.user} />
          ))}
        </Box>
      </Box>
    </Grid>
  );
};

export default Approvals;