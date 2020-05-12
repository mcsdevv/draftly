import cn from "classnames";
import styles from "./grid.module.css";

interface GridProps {
  children: React.ReactNode;
  columns?: string;
}

const Grid = ({ children, columns = "single" }: GridProps) => (
  <div
    className={cn(styles.grid, {
      [styles.single]: columns === "single",
      [styles.double]: columns === "double",
    })}
  >
    {children}
  </div>
);

export default Grid;
