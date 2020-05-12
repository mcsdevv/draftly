import styles from "./input.module.css";

import Button from "../button";

interface InputProps {
  buttonDisabled?: boolean;
  buttonText?: string;
  disabled?: boolean;
  label?: string;
  max?: number;
  min?: number;
  name?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
  text?: string;
  type: string;
  value: string | number;
}

const Input = ({
  buttonDisabled = false,
  buttonText = undefined,
  disabled = false,
  label = undefined,
  max,
  min,
  name,
  onChange,
  onSubmit,
  placeholder = "",
  text,
  type,
  value,
}: InputProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          disabled={disabled}
          max={max}
          min={min}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value || ""}
        />
        {buttonText && (
          <Button disabled={buttonDisabled} type="submit" onClick={onSubmit}>
            {buttonText}
          </Button>
        )}
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Input;
