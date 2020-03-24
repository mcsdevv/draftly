import {
  Box,
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
    <form onSubmit={onSubmit}>
      <FormControl mb="4">
        <FormLabel htmlFor={htmlFor}>{label}</FormLabel>
        <Box display="flex">
          {children}
          <Button disabled={disabled} marginLeft="4" my="2" type="submit">
            {buttonText || "Update"}
          </Button>
        </Box>
        <FormHelperText id="email-helper-text">{helperText}</FormHelperText>
      </FormControl>
    </form>
  );
}
