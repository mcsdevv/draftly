// * Libraries
import React, { useMemo } from "react";

// * Modulz
import {
  Button,
  Box,
  Flex,
  Input,
  Subheading,
  Text,
  Textarea,
  Tooltip,
} from "@modulz/radix";

// * Components
import Characters from "@components/characters";

interface ComposeFieldsProps {
  campaign: string;
  context: string;
  handleCampaignChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleReset: () => void;
  handleUpdate: () => void;
  handleTweetChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  saving: boolean;
  tweet: string;
}

const ComposeFields = ({
  campaign,
  context,
  handleCampaignChange,
  handleReset,
  handleUpdate,
  handleTweetChange,
  saving,
  tweet,
}: ComposeFieldsProps) => {
  // * Calculate the correct create/update state
  const updateStatus = useMemo(() => {
    // * Default state, create tweet
    if (context === "creating") {
      return {
        label: "Click to create this tweet.",
        text: "Create",
      };
    }

    // * Secondary state, updating tweet
    return {
      label: "Click to update this tweet.",
      text: "Update",
    };
  }, [context]);
  return (
    <Box sx={{ height: "fit-content", width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Subheading mb={2}>Campaign</Subheading>
        <Input
          disabled={saving}
          onChange={handleCampaignChange}
          placeholder="Campaign..."
          size={1}
          type="email"
          value={campaign}
        />
        <Text mt={2} mb={4} as="p" sx={{ color: "gray600" }}>
          Enter a campaign name for your tweet.
        </Text>
        <Subheading mb={2}>Tweet</Subheading>
        <Textarea
          disabled={saving}
          placeholder="Tweet..."
          onChange={handleTweetChange}
          value={tweet}
        />
        <Characters progress={(tweet.length / 280) * 100} />
        <Text mt={2} as="p" sx={{ color: "gray600" }}>
          Enter the text required for your tweet.
        </Text>
        <Flex sx={{ justifyContent: "center" }} mt={4}>
          <Tooltip label="Reset the campaign and text." align="center">
            <Box>
              <Button
                sx={{ cursor: "pointer", width: 100 }}
                disabled={!campaign && !tweet}
                isWaiting={saving}
                onClick={handleReset}
                variant="red"
              >
                Reset
              </Button>
            </Box>
          </Tooltip>
          <Tooltip label={updateStatus.label} align="center">
            <Box>
              <Button
                sx={{ cursor: "pointer", width: 100 }}
                disabled={!campaign || !tweet}
                isWaiting={saving}
                ml={4}
                onClick={handleUpdate}
                variant="blue"
              >
                {updateStatus.text}
              </Button>
            </Box>
          </Tooltip>
        </Flex>
      </Box>
    </Box>
  );
};

export default ComposeFields;
