import styles from "./select.module.css";

const Select = ({ disabled, onChange, options, value }) => (
  <select
    className={styles.select}
    disabled={disabled}
    onChange={onChange}
    value={value}
  >
    {options &&
      options.map((o) => (
        <option key={o.name} value={o.handle}>
          {o.name}
        </option>
      ))}
    <option value="new">+ Add New Team</option>
  </select>
);

export default Select;
