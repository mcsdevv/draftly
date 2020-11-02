// * Modulz
import { Box, Grid, Subheading } from "@modulz/radix";

// * Components
import Approved from "@components/information/reviews/approved";
import Requested from "@components/information/reviews/requested";
import Unrequested from "@components/information/reviews/unrequested";

interface ReviewsProps {
  approved: any[];
  requested: any[];
  unrequested: any[];
}

const Reviews = ({ approved, requested, unrequested }: ReviewsProps) => {
  return (
    <Grid mb={4} sx={{ gap: 20, gridTemplateColumns: "1fr 1fr" }}>
      <Box>
        <Subheading mb={1}>Requested Reviews</Subheading>
        {requested.map((r) => (
          <Requested key={r.uid} user={r.user} />
        ))}
        {unrequested.map((u) => (
          <Unrequested key={u.uid} user={u.user} />
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

export default Reviews;
