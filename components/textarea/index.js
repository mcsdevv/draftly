import cn from "classnames";
import styles from "./textarea.module.css";

const Textarea = ({ onChange, placeholder = "", type = "edit", value }) => (
  <textarea
    className={cn(styles.textarea, {
      [styles.edit]: type === "edit",
      [styles.compose]: type === "compose",
    })}
    onChange={onChange}
    placeholder={placeholder}
    value={value}
  />
);

export default Textarea;
