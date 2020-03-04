import { Box, Heading, Icon } from "@chakra-ui/core";

export default function CardTop({ handle, name }) {
  const date = new Date();
  return (
    <Box
      display="flex"
      fontSize="15px"
      fontWeight="700"
      lineHeight="22.5px"
      marginBottom="2px"
    >
      <Heading as="h4" fontSize="15px" fontWeight="700">
        {name}
      </Heading>
      <Icon
        name="padlock"
        h="18.75px"
        marginBottom="2.5px"
        marginLeft="2px"
        w="18.75px"
      />
      <Heading
        as="h4"
        fontSize="15px"
        fontWeight="400"
        color="rgb(101, 119, 134)"
        marginLeft="5px"
      >
        @{handle}
      </Heading>
      <Box
        alignContent="center"
        color="rgb(101, 119, 134)"
        display="grid"
        fontWeight="400"
        h="12px"
        px="5px"
      >
        .
      </Box>
      <Box color="rgb(101, 119, 134)" display="flex">
        <Heading as="h4" fontSize="15px" fontWeight="400" marginRight="5px">
          {date.toLocaleString("default", { month: "short" })}
        </Heading>
        <Heading fontSize="15px" fontWeight="400">
          {date.toLocaleString("default", { day: "numeric" })}
        </Heading>
      </Box>
      <Icon
        name="arrow"
        color="rgb(101, 119, 134)"
        marginLeft="auto"
        w="15px"
      />
    </Box>
  );
}
