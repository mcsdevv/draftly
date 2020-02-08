import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText
} from "@chakra-ui/core";

export default function Form({
  buttonText,
  children,
  disabled,
  helperText,
  htmlFor,
  label,
  onSubmit
}) {
  return (
    <>
      <FormControl onSubmit={onSubmit}>
        <FormLabel htmlFor={htmlFor}>{label}</FormLabel>
        {children}
        <Button disabled={disabled} type="submit">
          {buttonText || "Update"}
        </Button>
        <FormHelperText id="email-helper-text">{helperText}</FormHelperText>
      </FormControl>
      <style jsx>{``}</style>
    </>
  );
}
