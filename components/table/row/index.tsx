// * Libraries
import cn from "classnames";
import Link from "next/link";

// * Hooks
import useScope from "@hooks/use-scope";

// * Components
import ArrowRight from "@components/icons/arrows/right";

// * Styles
import styles from "./row.module.css";

interface RowProps {
  row: string[];
  twuid: string;
  type: string;
}

const Table = ({ row, twuid, type }: RowProps) => {
  const { scope } = useScope();
  const handle = scope?.handle;
  return (
    <tr className={styles.row}>
      {row.map((r) => (
        <td key={r}>
          <div className={styles.cell}>{r}</div>
        </td>
      ))}
      <td>
        <div className={cn(styles.cell, styles.cellIcon)}>
          <Link
            as={`/${handle}/tweets/${type}/${twuid}`}
            href={`/[handle]/tweets/${type}/[twuid]`}
          >
            <a className={styles.link}>
              <ArrowRight color="#16171b" />
            </a>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default Table;
