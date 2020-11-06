// * Libraries
import { useState } from "react";

// * Modulz
import {
  Box,
  Button,
  Grid,
  Flex,
  Option,
  Select,
  Subheading,
} from "@modulz/radix";

interface ControlsProps {
  approvals?: number;
  approvalsRequired?: number;
  disableApprove?: boolean;
  disablePublish?: boolean;
  disableRefresh?: boolean;
  editing?: boolean;
  handleApprove?: () => void;
  handleCancelEdit?: () => void;
  handleDelete: () => void;
  handleEdit?: () => void;
  handlePublish?: () => void;
  handleUpdate?: () => void;
}

const Controls = ({
  approvals,
  approvalsRequired,
  disableApprove,
  disablePublish,
  // disableRefresh,
  editing,
  handleApprove,
  handleCancelEdit,
  handleDelete,
  handleEdit,
  handlePublish,
  handleUpdate,
}: ControlsProps) => {
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

  return (
    <Box sx={{ width: "100%" }} mt={4}>
      <Flex
        sx={{
          justifyContent: "space-between",
          paddingTop: "16px",
        }}
      >
        <Grid>
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
        </Grid>
        <Grid>
          <Button
            sx={{ cursor: "pointer", width: 80 }}
            onClick={!editing ? handleEdit : handleUpdate}
          >
            {!editing ? "Edit" : "Update"}
          </Button>
          <Button
            sx={{ cursor: "pointer", width: 80 }}
            onClick={!editing ? handleDelete : handleCancelEdit}
            variant="red"
          >
            {!editing ? "Delete" : "Cancel"}
          </Button>
        </Grid>
        <Grid>
          <Button
            sx={{ cursor: "pointer", width: 80 }}
            disabled={disableApprove}
            onClick={handleApprove}
          >
            {approvalsRequired &&
              approvalsRequired > 0 &&
              `${approvals} / ${approvalsRequired}`}{" "}
            Approve
          </Button>
          <Button
            sx={{ cursor: "pointer", width: 80 }}
            disabled={disablePublish}
            onClick={handlePublish}
          >
            Publish
          </Button>
        </Grid>
      </Flex>
    </Box>
  );
};

export default Controls;
