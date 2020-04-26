import styles from "./input.module.css";

import Button from "../button";

const Input = ({
  buttonDisabled = false,
  buttonText = null,
  disabled = false,
  label = false,
  max,
  min,
  name,
  onChange,
  onSubmit,
  placeholder = "",
  text,
  type,
  value,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.wrapper}>
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
        {buttonText && (
          <Button disabled={buttonDisabled} onClick={onSubmit}>
            {buttonText}
          </Button>
        )}
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Input;
