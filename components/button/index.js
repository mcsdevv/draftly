import cn from "classnames";
import styles from "./button.module.css";

const Button = ({ disabled, children, onClick, type = "primary" }) => (
  <button
    className={cn(styles.button, {
      [styles.primary]: type === "primary",
      [styles.secondary]: type === "secondary",
      [styles.tertiary]: type === "tertiary",
    })}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
