// * Libraries
import Link from "next/link";

// * Hooks
import useScope from "@hooks/use-scope";

// * Modulz
import { Box, IconButton, Tr, Td } from "@modulz/radix";
import { ArrowRightIcon, TrashIcon } from "@modulz/radix-icons";

interface RowProps {
  handleOnDelete?: () => void;
  row: string[];
  twuid: string;
  type: string;
}

const Table = ({ handleOnDelete, row, twuid, type }: RowProps) => {
  const { scope } = useScope();
  const handle = scope?.handle;
  return (
    <Tr>
      {row.map((r, i) => (
        <Td key={r + i}>
          <Box
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "160px",
              width: "fit-content",
            }}
          >
            {r}
          </Box>
        </Td>
      ))}
      <Td>
        <Link
          as={`/${handle}/tweets/${type}/${twuid}`}
          href={`/[handle]/tweets/${type}/[twuid]`}
        >
          <IconButton sx={{ cursor: "pointer" }}>
            <a style={{ color: "#16171b", textDecoration: "none" }}>
              <ArrowRightIcon />
            </a>
          </IconButton>
        </Link>
      </Td>
      <Td>
        <IconButton
          sx={{ cursor: "pointer", marginLeft: "4px" }}
          onClick={handleOnDelete}
        >
          <TrashIcon />
        </IconButton>
      </Td>
    </Tr>
  );
};

export default Table;
