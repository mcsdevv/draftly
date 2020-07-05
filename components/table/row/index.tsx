// * Libraries
import Link from "next/link";

// * Hooks
import useScope from "@hooks/use-scope";

// * Modulz
import { Tr, Td } from "@modulz/radix";
import { ArrowRightIcon } from "@modulz/radix-icons";

interface RowProps {
  row: string[];
  twuid: string;
  type: string;
}

const Table = ({ row, twuid, type }: RowProps) => {
  const { scope } = useScope();
  const handle = scope?.handle;
  return (
    <Tr>
      {row.map((r, i) => (
        <Td key={r + i}>
          <div>{r}</div>
        </Td>
      ))}
      <Td>
        <Link
          as={`/${handle}/tweets/${type}/${twuid}`}
          href={`/[handle]/tweets/${type}/[twuid]`}
        >
          <a>
            <ArrowRightIcon />
          </a>
        </Link>
      </Td>
    </Tr>
  );
};

export default Table;
