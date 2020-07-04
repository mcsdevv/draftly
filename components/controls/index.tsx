import styles from "./controls.module.css";

import { Button } from "@modulz/radix";

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
  <div className={styles.container}>
    <Button onClick={!editing ? handleDelete : handleCancelEdit} variant="red">
      {!editing ? "Delete" : "Cancel"}
    </Button>
    <Button
      onClick={!editing ? handleEdit : handleUpdate}
      ml={4}
      variant="green"
    >
      {!editing ? "Edit" : "Update"}
    </Button>
    {!editing && handleApprove && handlePublish && (
      <>
        <Button disabled={disableApprove} ml={4} onClick={handleApprove}>
          {approvalsRequired &&
            approvalsRequired > 0 &&
            `${approvals} / ${approvalsRequired}`}{" "}
          Approve
        </Button>
        <Button
          disabled={disablePublish}
          onClick={handlePublish}
          ml={4}
          variant="blue"
        >
          Publish
        </Button>
      </>
    )}
  </div>
);

export default Controls;
