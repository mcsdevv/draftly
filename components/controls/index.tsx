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
  editing?: boolean;
  handleApprove?: () => void;
  handleCancelEdit?: () => void;
  handleDelete: () => void;
  handleEdit?: () => void;
  handlePublish?: () => void;
  handleUpdate?: () => void;
  type: string;
}

const Controls = ({
  approvals,
  approvalsRequired,
  disableApprove,
  disablePublish,
  editing,
  handleApprove,
  handleCancelEdit,
  handleDelete,
  handleEdit,
  handlePublish,
  handleUpdate,
}: ControlsProps) => (
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
        <Select value="default" sx={{ width: "120px" }}>
          <Option label="Default" value="default" />
          <Option label="Dim" value="dim" />
          <Option label="Lights Out" value="lights-out" />
        </Select>
      </Flex>
      <Flex mr={4} sx={{ flexDirection: "column" }}>
        <Button mb={4} sx={{ cursor: "pointer", width: "120px" }}>
          Request Feedback
        </Button>
        <Button sx={{ cursor: "pointer", width: "120px" }}>
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

export default Controls;
