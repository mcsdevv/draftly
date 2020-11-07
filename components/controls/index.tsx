// * Libraries
import { useMemo } from "react";
import { useRouter } from "next/router";

// * Hooks
import useScope from "@hooks/use-scope";
import useTweet from "@hooks/use-tweet";
import useUser from "@hooks/use-user";

// * Modulz
import { Box, Button, Flex, Tooltip } from "@modulz/radix";

interface ControlsProps {
  approvals?: number;
  approvalsRequired?: number;
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
  editing,
  handleApprove,
  handleCancelEdit,
  handleDelete,
  handleEdit,
  handlePublish,
  handleUpdate,
}: ControlsProps) => {
  // * Box component surrounds buttons to allow for tooltips to be shown on disabled button.

  // * Initialize hooks
  const { scope } = useScope();
  const router = useRouter();
  const { user } = useUser();

  // * Get twuid from route query
  const { twuid } = router.query;

  // * Get tweet from twuid
  const { tweet } = useTweet(twuid?.toString());

  // * Calculate the correct approval state
  const approvalStatus = useMemo(() => {
    // * Disable approval if user is creator
    if (tweet?.createdBy === user?.uid) {
      return {
        disabled: false,
        label: "You cannot approve your own tweet.",
      };
    }

    // * Disable approval if user has already approved
    if (tweet?.approvals.find((a: any) => a.uid === user?.uid)) {
      return {
        disabled: false,
        label: "You have already approved this tweet.",
      };
    }

    // * Enable approval
    return {
      disabled: true,
      label: "Click to approve this tweet.",
    };
  }, [scope, tweet]);

  // * Calculate the correct edit state
  const deleteStatus = useMemo(() => {
    // * Find user as owner within the team and creator of tweet
    const isOwner = scope.owners.find((o: any) => o.uid === user.uid);
    const creator = tweet.creator.uid === user.uid;

    // * Default state, not editing but owner or creator
    if (!editing && (isOwner || creator)) {
      return {
        disabled: false,
        label: "Click to delete this tweet.",
        onClick: handleDelete,
        text: "Delete",
      };
    }

    // * Default state, not editing but NOT owner
    if (!editing && !isOwner) {
      return {
        disabled: true,
        label: "Only owners can delete tweets.",
        onClick: handleDelete,
        text: "Delete",
      };
    }

    // * Secondary state, already editing
    return {
      label: "Click to cancel your edit.",
      onClick: handleCancelEdit,
      text: "Cancel",
    };
  }, [editing]);

  // * Calculate the correct edit state
  const editStatus = useMemo(() => {
    // * Default state, not editing
    if (!editing) {
      return {
        label: "Click to edit this tweet.",
        onClick: handleEdit,
        text: "Edit",
      };
    }

    // * Secondary state, already editing
    return {
      label: "Click to confirm your edit.",
      onClick: handleUpdate,
      text: "Update",
    };
  }, [editing]);

  // * Calculate the correct publish state
  const publishStatus = useMemo(() => {
    // * Get only approvals in the approved state
    const approvals = tweet?.approvals.filter(
      (a: any) => a.status === "approved"
    );

    // * Disable publish if required reviews not present
    if (approvals?.length < scope?.reviewsRequired) {
      return {
        disabled: false,
        label: "Insufficient approvals to publish.",
      };
    }

    // * Enable publish
    return {
      disabled: true,
      label: "Click to publish this tweet.",
    };
  }, [scope, tweet]);
  return (
    <Box>
      <Flex sx={{ justifyContent: "space-between" }}>
        <Tooltip label={editStatus.label} align="center">
          <Box>
            <Button
              sx={{ cursor: "pointer", width: 100 }}
              onClick={editStatus.onClick}
            >
              {editStatus.text}
            </Button>
          </Box>
        </Tooltip>
        <Tooltip label={approvalStatus.label} align="center">
          <Box>
            <Button
              sx={{ cursor: "pointer", width: 100 }}
              disabled={!approvalStatus.disabled}
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
              disabled={!publishStatus.disabled}
              onClick={handlePublish}
            >
              Publish
            </Button>
          </Box>
        </Tooltip>
        <Tooltip label={deleteStatus.label} align="center">
          <Box>
            <Button
              sx={{ cursor: "pointer", width: 100 }}
              disabled={deleteStatus.disabled}
              onClick={deleteStatus.onClick}
              variant="red"
            >
              {deleteStatus.text}
            </Button>
          </Box>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Controls;
