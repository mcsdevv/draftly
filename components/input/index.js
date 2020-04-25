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
  withButton,
}) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <p>{text}</p>
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
        {withButton && (
          <Button disabled={buttonDisabled} onClick={onSubmit}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Input;
