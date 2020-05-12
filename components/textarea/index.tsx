import cn from "classnames";
import styles from "./textarea.module.css";

interface TextareaProps {
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  value: string;
}

const Textarea = ({
  onChange,
  placeholder = "",
  type = "edit",
  value,
}: TextareaProps) => (
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
