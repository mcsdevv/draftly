// * Styles
import styles from "./table.module.css";

interface TableProps {
  children: React.ReactNode;
  headers: string[];
}

const Table = ({ children, headers }: TableProps) => (
  <table cellSpacing="1" cellPadding="0" className={styles.table}>
    <thead>
      <tr>
        {headers.map((h) => (
          <th className={styles.header} key={h}>
            {h}
          </th>
        ))}
        <th className={styles.header}>View</th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

export default Table;
