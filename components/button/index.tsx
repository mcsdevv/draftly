import cn from "classnames";
import styles from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  margin: boolean;
  onClick: () => void;
  type: string;
}

const Button = ({
  children,
  disabled,
  margin = true,
  onClick,
  type = "primary",
}: ButtonProps) => (
  <button
    className={cn(styles.button, {
      [styles.primary]: type === "primary",
      [styles.secondary]: type === "secondary",
      [styles.tertiary]: type === "tertiary",
      [styles.noMargin]: margin === false,
    })}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
