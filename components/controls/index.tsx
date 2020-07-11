// * Modulz
import { Button, Card, Flex } from "@modulz/radix";

interface ControlsProps {
  approvals?: number;
  approvalsRequired?: number;
  disableApprove?: boolean;
  disablePublish?: boolean;
  editing?: boolean;
  handleApprove?: () => void;
  handleCancelEdit: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
  handlePublish?: () => void;
  handleUpdate: () => void;
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
    <Flex
      sx={{
        alignContent: "center",
        justifyContent: "center",
        padding: "16px 0",
      }}
    >
      <Button
        sx={{ cursor: "pointer" }}
        onClick={!editing ? handleDelete : handleCancelEdit}
        variant="red"
      >
        {!editing ? "Delete" : "Cancel"}
      </Button>
      <Button
        sx={{ cursor: "pointer" }}
        onClick={!editing ? handleEdit : handleUpdate}
        ml={4}
      >
        {!editing ? "Edit" : "Update"}
      </Button>
      <Button
        sx={{ cursor: "pointer" }}
        disabled={disableApprove}
        ml={4}
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
        ml={4}
        variant="blue"
      >
        Publish
      </Button>
    </Flex>
  </Card>
);

export default Controls;
