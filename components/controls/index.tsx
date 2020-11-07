// * Modulz
import { Box, Button, Flex, Tooltip } from "@modulz/radix";

interface ControlsProps {
  approvals?: number;
  approvalsRequired?: number;
  approvalStatus: any;
  editing?: boolean;
  handleApprove?: () => void;
  handleCancelEdit?: () => void;
  handleDelete: () => void;
  handleEdit?: () => void;
  handlePublish?: () => void;
  handleUpdate?: () => void;
  publishStatus: any;
}

const Controls = ({
  approvals,
  approvalsRequired,
  approvalStatus,
  editing,
  handleApprove,
  handleCancelEdit,
  handleDelete,
  handleEdit,
  handlePublish,
  handleUpdate,
  publishStatus,
}: ControlsProps) => {
  // * Box component surrounds buttons to allow for tooltips to be shown on disabled button.
  return (
    <Box>
      <Flex sx={{ justifyContent: "space-between" }}>
        <Button
          sx={{ cursor: "pointer", width: 100 }}
          onClick={!editing ? handleEdit : handleUpdate}
        >
          {!editing ? "Edit" : "Update"}
        </Button>
        <Tooltip label={approvalStatus.label} align="center">
          <Box>
            <Button
              sx={{ cursor: "pointer", width: 100 }}
              disabled={!approvalStatus.status}
              onClick={handleApprove}
            >
              {approvalsRequired &&
                approvalsRequired > 0 &&
                `${approvals} / ${approvalsRequired}`}{" "}
              Approve
            </Button>
          </Box>
        </Tooltip>
        <Tooltip label={publishStatus.label} align="center">
          <Box>
            <Button
              sx={{ cursor: "pointer", width: 100 }}
              disabled={!publishStatus.status}
              onClick={handlePublish}
            >
              Publish
            </Button>
          </Box>
        </Tooltip>
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
