import styles from "./select.module.css";

interface SelectProps {
  disabled?: boolean;
  onChange: () => void;
  options: any;
  value: string;
}

const Select = ({ disabled, onChange, options, value }: SelectProps) => (
  <select
    className={styles.select}
    disabled={disabled}
    onChange={onChange}
    value={value}
  >
    {options &&
      options.map((o: any) => (
        <option key={o.name} value={o.handle}>
          {o.name}
        </option>
      ))}
    <option value="new">+ Add New Team</option>
  </select>
);

export default Select;
