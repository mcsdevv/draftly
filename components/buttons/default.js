import { Button } from "@chakra-ui/core";

export default ({ disabled, handleOnClick, loading, text }) => (
  <>
    <Button variantColor="green" disabled={disabled} onClick={handleOnClick}>
      {text}
    </Button>
    <style jsx>{`
      button {
        border: 1px solid black;
        margin: 0.5em;
        padding: 0.5em;
      }
    `}</style>
  </>
);
