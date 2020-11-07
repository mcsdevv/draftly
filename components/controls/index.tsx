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
        label: "You cannot approve your own tweet.",
        status: false,
      };
    }

    // * Disable approval if user has already approved
    if (tweet?.approvals.find((a: any) => a.uid === user?.uid)) {
      return {
        label: "You have already approved this tweet.",
        status: false,
      };
    }

    // * Enable approval
    return {
      label: "Click to approve this tweet.",
      status: true,
    };
  }, [scope, tweet]);

  // * Calculate the correct publish state
  const publishStatus = useMemo(() => {
    // * Get only approvals in the approved state
    const approvals = tweet?.approvals.filter(
      (a: any) => a.status === "approved"
    );

    // * Disable publish if required reviews not present
    if (approvals?.length < scope?.reviewsRequired) {
      return {
        label: "Insufficient approvals to publish.",
        status: false,
      };
    }

    // * Enable publish
    return {
      label: "Click to publish this tweet.",
      status: true,
    };
  }, [scope, tweet]);
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
