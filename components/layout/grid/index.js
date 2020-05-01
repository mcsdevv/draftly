import cn from "classnames";
import styles from "./grid.module.css";

const Grid = ({ children, columns = "single" }) => (
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
