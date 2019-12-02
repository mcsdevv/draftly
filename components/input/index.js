export default function Input({ label, name, onChange, type, value }) {
  return (
    <>
      <label>{label}</label>
      <input name={name} onChange={onChange} type={type} value={value} />
    </>
  );
}
