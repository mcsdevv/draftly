import Linkify from "react-linkify";

import { Box, Heading, Icon, Image, Text } from "@chakra-ui/core";
import CardTop from "../sections/top";
import CardBottom from "../sections/bottom";

import Characters from "../../characters";
import Textarea from "../../textarea";

import styles from "./large.module.css";

export default function Large({
  editing,
  editTweet,
  handleOnChange,
  meta,
  scope,
  text,
}) {
  return (
    <div className={styles.cardLarge}>
      <CardTop handle={scope.handle} name={scope.name} />
      <p className={styles.cardText}>
        <Linkify
          properties={{
            target: "_blank",
            style: { color: "red", fontWeight: "bold" },
          }}
        >
          {!editing ? (
            text
          ) : (
            <Textarea onChange={handleOnChange} value={editTweet} />
          )}
        </Linkify>
      </p>
      {editing && <Characters progress={(editTweet.length / 280) * 100} />}
      <a className={styles.cardLink} href={`https://${meta.url}`}>
        <Box
          border="1px solid rgb(204, 214, 221)"
          borderRadius="14px"
          marginTop="10px"
        >
          <Box borderBottom="1px solid rgb(204, 214, 221)" h="265px">
            <Image
              src={meta.image}
              roundedTop="14px"
              h="100%"
              maxW="100%"
              w="100%"
            />
          </Box>
          <Box p="10px">
            <Heading
              as="h3"
              color="rgb(20, 23, 26)"
              fontSize="15px"
              fontWeight="400"
            >
              {meta.title}
            </Heading>
            <Text color="rgb(101, 119, 134)" fontWeight="400">
              {meta.description}
            </Text>
            <Box
              alignItems="center"
              display="flex"
              color="rgb(101, 119, 134)"
              fontWeight="400"
            >
              <Icon marginRight="2px" marginTop="2px" name="link" />
              <Text>{new URL(`https://${meta.url}`, location).hostname}</Text>
            </Box>
          </Box>
        </Box>
      </a>
      <CardBottom />
    </div>
  );
}
