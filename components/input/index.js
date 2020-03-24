import { Input } from "@chakra-ui/core";

export default function InputField({
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
      <Input
        max={max}
        min={min}
        my="2"
        name={name}
        onChange={onChange}
        type={type}
        value={value || ""}
      />
    </>
  );
}
