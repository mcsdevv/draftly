import { Box, IconButton, Tooltip } from "@chakra-ui/core";

export default function Icon({
  as,
  disabled,
  onClick,
  showDelay,
  tooltip,
  tooltipDisabled
}) {
  const iconHolder = () => {
    return (
      <Box m="4">
        <IconButton
          as={as}
          bg="none"
          color={disabled ? "#999" : "#333"}
          cursor="pointer"
          onClick={onClick}
          p="2"
          strokeWidth="1.5px"
        ></IconButton>
      </Box>
    );
  };
  return !tooltip ? (
    iconHolder()
  ) : (
    <Tooltip
      hasArrow
      label={disabled ? tooltipDisabled : tooltip}
      placement="bottom"
    >
      {iconHolder()}
    </Tooltip>
  );
}
