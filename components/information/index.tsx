// * Libraries
import ago from "s-ago";
import { useMemo, useState } from "react";

// * Modulz
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  Option,
  Select,
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
  // * Initialize theme to the default
  const [theme, setTheme] = useState("default");

  // * Change theme to that selected
  const handleOnChange = (newTheme?: string | undefined) => {
    if (newTheme === undefined) {
      throw new Error("Selected theme cannot be undefined.");
    }
    setTheme(newTheme);
    setThemeVariables(themes[newTheme]);
  };

  // * Sets the CSS variables based on provided themes
  const setThemeVariables = (selectedTheme?: any) => {
    Object.keys(selectedTheme).map((key: string) => {
      const value = selectedTheme[key];
      document.documentElement.style.setProperty(key, value);
    });
  };

  const defaultTheme = {
    "--twitter-color-1": "rgb(255, 255, 255)", // background
    "--twitter-color-2": "rgb(230, 236, 240)", // border
    "--twitter-color-3": "rgb(101, 119, 134)", // bottom icons
    "--twitter-color-4": "rgb(27, 149, 224)", // links
    "--twitter-color-5": "rgb(204, 214, 221)", // card border
    "--twitter-color-6": "rgb(20, 23, 26)", // card title
    "--twitter-color-7": "rgb(245, 248, 250)", // fallback background
    "--twitter-color-8": "rgb(28, 29, 32)", // top name
    "--twitter-color-9": "rgb(106, 119, 133)", // fallback icon
  };

  const dimTheme = {
    "--twitter-color-1": "rgb(31, 37, 47)",
    "--twitter-color-2": "rgb(62, 70, 78)",
    "--twitter-color-3": "rgb(140, 151, 164)",
    "--twitter-color-4": "rgb(87, 148, 221)",
    "--twitter-color-5": "rgb(62, 70, 78)",
    "--twitter-color-6": "rgb(255, 255, 255)",
    "--twitter-color-7": "rgb(35, 43, 55)",
    "--twitter-color-8": "rgb(255, 255, 255)",
    "--twitter-color-9": "rgb(140, 151, 164)",
  };

  const lightsOutTheme = {
    "--twitter-color-1": "rgb(0, 0, 0)",
    "--twitter-color-2": "rgb(52, 54, 57)",
    "--twitter-color-3": "rgb(112, 117, 124)",
    "--twitter-color-4": "rgb(87, 148, 221)",
    "--twitter-color-5": "rgb(52, 54, 57)",
    "--twitter-color-6": "rgb(216, 216, 216)",
    "--twitter-color-7": "rgb(28, 30, 33)",
    "--twitter-color-8": "rgb(216, 216, 216)",
    "--twitter-color-9": "rgb(112, 118, 124)",
  };

  // * Define a list of theme variables
  const themes: any = {
    default: defaultTheme,
    dim: dimTheme,
    lightsOut: lightsOutTheme,
  };

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
      <Grid mb={4} sx={{ gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <Box>
          <Subheading mb={1}>Theme</Subheading>
          <Select
            onValueChange={handleOnChange}
            value={theme}
            sx={{ width: "120px" }}
          >
            <Option label="Default" value="default" />
            <Option label="Dim" value="dim" />
            <Option label="Lights" value="lightsOut" />
          </Select>
        </Box>
        <Box>
          <Subheading mb={1}>Type</Subheading>
          <Text sx={{ textDecoration: "capitalize" }}>{tweet.type}</Text>
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
