export default function Input({ label, name, onChange, text, type, value }) {
  return (
    <>
      <label>{label}</label>
      <p>{text}</p>
      <input name={name} onChange={onChange} type={type} value={value} />
      <style jsx>{``}</style>
    </>
  );
}
