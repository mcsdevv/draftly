import styles from "./input.module.css";

const Input = ({
  disabled = false,
  label = false,
  max,
  min,
  name,
  onChange,
  placeholder = "",
  text,
  type,
  value,
}) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <p>{text}</p>
      <input
        className={styles.input}
        disabled={disabled}
        max={max}
        min={min}
        my="2"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value || ""}
      />
    </div>
  );
};

export default Input;
