import styles from "./textarea.module.css";

const Textarea = ({ onChange, value }) => (
  <textarea className={styles.textarea} onChange={onChange} value={value} />
);

export default Textarea;
