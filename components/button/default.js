import { Button } from "@chakra-ui/core";

export default ({ disabled, handleOnClick, loading, text }) => (
  <Button
    variantColor="green"
    disabled={disabled}
    mx="2"
    onClick={handleOnClick}
  >
    {text}
  </Button>
);
