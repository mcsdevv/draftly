// * Libraries
import React from "react";

// * Modulz
import {
  Button,
  Box,
  Flex,
  Input,
  Subheading,
  Text,
  Textarea,
} from "@modulz/radix";

// * Components
import Characters from "@components/characters";

interface ComposeFieldsProps {
  campaign: string;
  context: string;
  handleCampaignChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleReset?: () => void;
  handleSave: () => void;
  handleTweetChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  saving: boolean;
  tweet: string;
}

const ComposeFields = ({
  campaign,
  context,
  handleCampaignChange,
  handleReset,
  handleSave,
  handleTweetChange,
  saving,
  tweet,
}: ComposeFieldsProps) => {
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
        {context === "creating" ? (
          <Flex sx={{ justifyContent: "center" }} mt={4}>
            <Button
              disabled={!campaign && !tweet}
              isWaiting={saving}
              onClick={handleReset}
              variant="red"
            >
              Reset
            </Button>
            <Button
              disabled={!campaign || !tweet}
              isWaiting={saving}
              ml={4}
              onClick={handleSave}
              variant="blue"
            >
              Create
            </Button>
          </Flex>
        ) : null}
      </Box>
    </Box>
  );
};

export default ComposeFields;
