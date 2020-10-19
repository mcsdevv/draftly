// * Libraries
import React from "react";

// * Modulz
import { Button, Card, Flex, Input, Subheading, Textarea } from "@modulz/radix";

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
  text: string;
}

const ComposeFields = ({
  campaign,
  context,
  handleCampaignChange,
  handleReset,
  handleSave,
  handleTweetChange,
  saving,
  text,
}: ComposeFieldsProps) => {
  return (
    <Card sx={{ width: "100%" }}>
      <Subheading mb={2}>Campaign</Subheading>
      <Input
        disabled={saving}
        mb={4}
        onChange={handleCampaignChange}
        size={1}
        type="email"
        value={campaign}
      />
      <Subheading mb={2}>Text</Subheading>
      <Textarea
        disabled={saving}
        placeholder="Draft your tweet..."
        onChange={handleTweetChange}
        value={text}
      />
      <Characters progress={(text.length / 280) * 100} />
      {context === "creating" ? (
        <Flex sx={{ justifyContent: "center" }} mt={4}>
          <Button
            disabled={!campaign && !text}
            isWaiting={saving}
            onClick={handleReset}
            variant="red"
          >
            Reset
          </Button>
          <Button
            disabled={!campaign || !text}
            isWaiting={saving}
            ml={4}
            onClick={handleSave}
            variant="blue"
          >
            Create
          </Button>
        </Flex>
      ) : null}
    </Card>
  );
};

export default ComposeFields;
