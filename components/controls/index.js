import styles from "./controls.module.css";

import Button from "../button";

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
  handleReviewReady,
  type,
}) => (
  <div className={styles.container}>
    <Button
      onClick={!editing ? handleDelete : handleCancelEdit}
      margin={false}
      type="tertiary"
    >
      {!editing ? "Delete" : "Cancel"}
    </Button>
    <Button onClick={!editing ? handleEdit : handleUpdate} type="secondary">
      {!editing ? "Edit" : "Update"}
    </Button>
    {!editing && type === "draft" && (
      <Button onClick={handleReviewReady} type="primary">
        Review
      </Button>
    )}
    {!editing && type === "review" && (
      <>
        <Button
          disabled={disableApprove}
          onClick={handleApprove}
          type="primary"
        >
          {approvalsRequired > 0 && `${approvals} / ${approvalsRequired}`}{" "}
          Approve
        </Button>
        <Button
          disabled={disablePublish}
          onClick={handlePublish}
          type="primary"
        >
          Publish
        </Button>
      </>
    )}
  </div>
);

export default Controls;
