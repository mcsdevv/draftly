import cn from "classnames";
import styles from "./row.module.css";

interface RowProps {
  row: string[];
}

const Table = ({ row }: RowProps) => (
  <tr className={styles.row}>
    {row.map((r) => (
      <td key={r}>
        <div className={styles.cell}>{r}</div>
      </td>
    ))}
  </tr>
);

export default Table;
