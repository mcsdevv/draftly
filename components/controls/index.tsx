// * Libraries
import { useState } from "react";

// * Modulz
import {
  Button,
  Card,
  Divider,
  Flex,
  Heading,
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
  disableRefresh,
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
  };

  const dimTheme = {
    "--twitter-color-1": "rgb(31, 37, 47)",
    "--twitter-color-2": "rgb(62, 70, 78)",
    "--twitter-color-3": "rgb(140, 151, 164)",
    "--twitter-color-4": "rgb(87, 148, 221)",
    "--twitter-color-5": "rgb(62, 70, 78)",
    "--twitter-color-6": "rgb(255, 255, 255)",
    "--twitter-color-7": "rgb(245, 248, 250)", // needs confirming (small card only no image)
    "--twitter-color-8": "rgb(255, 255, 255)",
  };

  const lightsOutTheme = {
    "--twitter-color-1": "rgb(0, 0, 0)",
    "--twitter-color-2": "rgb(52, 54, 57)",
    "--twitter-color-3": "rgb(112, 117, 124)",
    "--twitter-color-4": "rgb(87, 148, 221)",
    "--twitter-color-5": "rgb(52, 54, 57)",
    "--twitter-color-6": "rgb(216, 216, 216)",
    "--twitter-color-7": "rgb(245, 248, 250)", // needs confirming (small card only no image)
    "--twitter-color-8": "rgb(216, 216, 216)",
  };

  // * Define a list of theme variables
  const themes: any = {
    default: defaultTheme,
    dim: dimTheme,
    lightsOut: lightsOutTheme,
  };

  return (
    <Card sx={{ width: "100%" }} mt={4}>
      <Heading as="h2" size={4}>
        Controls
      </Heading>
      <Divider mb={2} />
      <Flex
        sx={{
          paddingTop: "16px",
        }}
      >
        <Flex mr={4} sx={{ flexDirection: "column" }}>
          <Subheading mb={5}>Select Theme</Subheading>
          <Select
            onValueChange={handleOnChange}
            value={theme}
            sx={{ width: "120px" }}
          >
            <Option label="Default" value="default" />
            <Option label="Dim" value="dim" />
            <Option label="Lights Out" value="lightsOut" />
          </Select>
        </Flex>
        <Flex mr={4} sx={{ flexDirection: "column" }}>
          <Button mb={4} sx={{ cursor: "pointer", width: "120px" }}>
            Request Feedback
          </Button>
          <Button
            disabled={disableRefresh}
            sx={{ cursor: "pointer", width: "120px" }}
          >
            Refresh Metadata
          </Button>
        </Flex>
        <Flex mr={4} sx={{ flexDirection: "column" }}>
          <Button
            mb={4}
            sx={{ cursor: "pointer", width: "120px" }}
            onClick={!editing ? handleEdit : handleUpdate}
          >
            {!editing ? "Edit" : "Update"}
          </Button>
          <Button
            sx={{ cursor: "pointer", width: "120px" }}
            onClick={!editing ? handleDelete : handleCancelEdit}
            variant="red"
          >
            {!editing ? "Delete" : "Cancel"}
          </Button>
        </Flex>
        <Flex sx={{ flexDirection: "column" }}>
          <Button
            sx={{ cursor: "pointer", width: "120px" }}
            disabled={disableApprove}
            mb={4}
            onClick={handleApprove}
            variant="green"
          >
            {approvalsRequired &&
              approvalsRequired > 0 &&
              `${approvals} / ${approvalsRequired}`}{" "}
            Approve
          </Button>
          <Button
            sx={{ cursor: "pointer" }}
            disabled={disablePublish}
            onClick={handlePublish}
            variant="blue"
          >
            Publish
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Controls;
