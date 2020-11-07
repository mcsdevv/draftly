// * Modulz
import { Box, Button, Flex } from "@modulz/radix";

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
  return (
    <Box>
      <Flex sx={{ justifyContent: "space-between" }}>
        <Button
          sx={{ cursor: "pointer", width: 100 }}
          onClick={!editing ? handleEdit : handleUpdate}
        >
          {!editing ? "Edit" : "Update"}
        </Button>
        <Button
          sx={{ cursor: "pointer", width: 100 }}
          disabled={disableApprove}
          onClick={handleApprove}
        >
          {approvalsRequired &&
            approvalsRequired > 0 &&
            `${approvals} / ${approvalsRequired}`}{" "}
          Approve
        </Button>
        <Button
          sx={{ cursor: "pointer", width: 100 }}
          disabled={disablePublish}
          onClick={handlePublish}
        >
          Publish
        </Button>
        <Button
          sx={{ cursor: "pointer", width: 100 }}
          onClick={!editing ? handleDelete : handleCancelEdit}
          variant="red"
        >
          {!editing ? "Delete" : "Cancel"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Controls;
