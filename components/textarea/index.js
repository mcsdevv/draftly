import styles from "./textarea.module.css";

const Textarea = ({ onChange, placeholder = "", value }) => (
  <textarea
    className={styles.textarea}
    onChange={onChange}
    placeholder={placeholder}
    value={value}
  />
);

export default Textarea;
