// * Modulz
import { Box, Text } from "@modulz/radix";

interface TabProps {
  handleOnClick: () => void;
  name: string;
  selected: boolean;
}

function Tab({ handleOnClick, name, selected }: TabProps) {
  return (
    <Box
      sx={{
        borderBottom: !selected
          ? "2px hsl(210, 15%, 90%) solid"
          : "2px black solid",
        cursor: "pointer",
        height: "40px",
        textAlign: "center",
        width: "80px",
      }}
      onClick={handleOnClick}
    >
      <Text weight="medium">{name}</Text>
    </Box>
  );
}

export default Tab;
