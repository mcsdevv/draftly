export default function Input({
  label,
  max,
  min,
  name,
  onChange,
  text,
  type,
  value
}) {
  return (
    <>
      <label>{label}</label>
      <p>{text}</p>
      <input
        max={max}
        min={min}
        name={name}
        onChange={onChange}
        type={type}
        value={value || ""}
      />
      <style jsx>{``}</style>
    </>
  );
}
