// * Libraries
import React from "react";

// * Modulz
import {
  Button,
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  Subheading,
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
      <Heading as="h2" size={4}>
        Compose
      </Heading>
      <Divider mb={2} />
      <Box sx={{ width: "100%" }}>
        <Subheading mb={2}>Campaign</Subheading>
        <Input
          disabled={saving}
          mb={4}
          onChange={handleCampaignChange}
          placeholder="Campaign..."
          size={1}
          type="email"
          value={campaign}
        />
        <Subheading mb={2}>Tweet</Subheading>
        <Textarea
          disabled={saving}
          placeholder="Tweet..."
          onChange={handleTweetChange}
          value={tweet}
        />
        <Characters progress={(tweet.length / 280) * 100} />
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
