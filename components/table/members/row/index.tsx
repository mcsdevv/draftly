// * Modulz
import { Box, IconButton, Tr, Td } from "@modulz/radix";
import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "@modulz/radix-icons";

interface MembersRowProps {
  activeUser?: boolean;
  handleDowngradeMember?: () => void;
  handleRemoveMember?: () => void;
  handleUpgradeMember?: () => void;
  loading?: boolean;
  row?: string[];
  twuid?: string;
  type?: string;
}

const MembersRow = ({
  activeUser,
  handleDowngradeMember,
  handleRemoveMember,
  handleUpgradeMember,
  loading,
  row,
  type,
}: MembersRowProps) => {
  return !loading ? (
    <Tr>
      {row?.map((r, i) => (
        <Td key={r + i}>
          <Box
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              margin: 0,
              width: "160px",
            }}
          >
            {r}
          </Box>
        </Td>
      ))}
      <Td>
        <IconButton
          disabled={activeUser}
          sx={{ cursor: "pointer", marginLeft: "4px", width: "60px" }}
          onClick={
            type === "member" ? handleUpgradeMember : handleDowngradeMember
          }
        >
          {type === "member" ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </IconButton>
      </Td>
      <Td>
        <IconButton
          disabled={activeUser}
          sx={{ cursor: "pointer", marginLeft: "4px", width: "60px" }}
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
            height: "60px",
            maxWidth: "136px",
            width: "100%",
          }}
        />
      </Td>
      <Td>
        <Box
          sx={{
            bg: "gray200",
            height: "60px",
            width: "100%",
          }}
        />
      </Td>
    </Tr>
  );
};

export default MembersRow;