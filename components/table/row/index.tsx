// * Libraries
import cn from "classnames";
import Link from "next/link";

// * Components
import ArrowRight from "@components/icons/arrows/right";

// * Styles
import styles from "./row.module.css";

interface RowProps {
  row: string[];
  twuid: string;
  type: string;
}

const Table = ({ row, twuid, type }: RowProps) => (
  <tr className={styles.row}>
    {row.map((r) => (
      <td key={r}>
        <div className={styles.cell}>{r}</div>
      </td>
    ))}
    <td>
      <div className={cn(styles.cell, styles.cellIcon)}>
        <Link href={`/tweets/${type}/${twuid}`}>
          <a className={styles.link}>
            <ArrowRight color="#16171b" />
          </a>
        </Link>
      </div>
    </td>
  </tr>
);

export default Table;
