// * Libraries
import Link from "next/link";

// * Hooks
import useScope from "@hooks/use-scope";

// * Modulz
import { Box, IconButton, Tr, Td } from "@modulz/radix";
import { ArrowRightIcon, TrashIcon } from "@modulz/radix-icons";

interface MembersRowProps {
  handleDowngradeMember?: () => void;
  handleRemoveMember?: () => void;
  handleUpgradeMember?: () => void;
  loading?: boolean;
  row?: string[];
  twuid?: string;
  type?: string;
}

const MembersRow = ({
  handleDowngradeMember,
  handleRemoveMember,
  handleUpgradeMember,
  loading,
  row,
  type,
}: MembersRowProps) => {
  const { scope } = useScope();
  const handle = scope?.handle;
  return !loading ? (
    <Tr>
      {row?.map((r, i) => (
        <Td key={r + i}>
          <Box
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "160px",
              margin: 0,
              width: "fit-content",
            }}
          >
            {r}
          </Box>
        </Td>
      ))}
      <Td>
        <IconButton
          sx={{ cursor: "pointer", marginLeft: "4px" }}
          onClick={
            type === "member" ? handleUpgradeMember : handleDowngradeMember
          }
        >
          <TrashIcon />
        </IconButton>
      </Td>
      <Td>
        <IconButton
          sx={{ cursor: "pointer", marginLeft: "4px" }}
          onClick={handleRemoveMember}
        >
          <TrashIcon />
        </IconButton>
      </Td>
    </Tr>
  ) : (
    <Tr>
      <Td>
        <Box
          sx={{
            bg: "gray200",
            height: "24px",
            maxWidth: "160px",
            width: "100%",
          }}
        />
      </Td>
      <Td>
        <Box
          sx={{
            bg: "gray200",
            height: "24px",
            maxWidth: "160px",
            width: "100%",
          }}
        />
      </Td>
      <Td>
        <Box
          sx={{
            bg: "gray200",
            height: "24px",
            maxWidth: "160px",
            width: "100%",
          }}
        />
      </Td>
      <Td>
        <Box
          sx={{
            bg: "gray200",
            height: "24px",
            width: "100%",
          }}
        />
      </Td>
    </Tr>
  );
};

export default MembersRow;
