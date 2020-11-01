// * Libraries
import ago from "s-ago";
import React, { useRef } from "react";

// * Modulz
import {
  Box,
  Button,
  Divider,
  DropdownMenu,
  Grid,
  List,
  ListItem,
  Menu,
  MenuItem,
  Subheading,
  Text,
} from "@modulz/radix";

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
      <Grid mb={4} sx={{ gridTemplateColumns: "1fr 1fr" }}>
        <Box>
          <Subheading>Created By</Subheading>
          <Text>{createdBy}</Text>
        </Box>
        <Box>
          <Subheading>Created At</Subheading>
          <Text>{ago(new Date(createdAt))}</Text>
        </Box>
      </Grid>
      <Grid mb={4} sx={{ gridTemplateColumns: "1fr 1fr" }}>
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
      <Grid mb={4} sx={{ gridTemplateColumns: "1fr 1fr" }}>
        <Box>
          <Subheading>Request Review</Subheading>
          <List>
            <ListItem variant="selected">Jonboy Jones</ListItem>
            <ListItem variant="selected">Michael Derps</ListItem>
            <ListItem>Bitty Cat</ListItem>
            <ListItem variant="selected">Wee Maki</ListItem>
            <ListItem>Dufty Woo</ListItem>
          </List>
        </Box>

        <Box>
          <Subheading mb={1}>Approved By</Subheading>
          <DropdownMenu
            button={<Button>View Approvals</Button>}
            menu={
              <Menu isOpen={false}>
                <MenuItem label="Michael Gray" />
              </Menu>
            }
          />
        </Box>
      </Grid>
      {/* <Grid mb={4} sx={{ gridTemplateColumns: "1fr 1fr" }}>
        <Box>
          <Subheading mb={1}>Request Review</Subheading>
          <DropdownMenu
            button={<Button>Select Members</Button>}
            menu={
              <Menu isOpen={false}>
                <MenuItem label="Michael Gray" />
              </Menu>
            }
          />
        </Box>
        <Box>
          <Subheading mb={1}>Approved By</Subheading>
          <DropdownMenu
            button={<Button>View Approvals</Button>}
            menu={
              <Menu isOpen={false}>
                <MenuItem label="Michael Gray" />
              </Menu>
            }
          />
        </Box>
      </Grid> */}
    </Box>
  );
};

export default Information;
