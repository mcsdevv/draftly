// * Modulz
import { Button, Card, Input, Subheading, Textarea } from "@modulz/radix";

// * Components
import Characters from "@components/characters";

const ComposeFields = ({
  campaign,
  handleCampaignChange,
  handleSave,
  handleTweetChange,
  handleUpdate,
  saving,
  state,
  text,
}) => {
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
      <Button
        disabled={!campaign || !text}
        isWaiting={saving}
        ml={2}
        onClick={state === "drafting" ? handleSave : handleUpdate}
        variant="blue"
      >
        Create Draft
      </Button>
    </Card>
  );
};

export default ComposeFields;
