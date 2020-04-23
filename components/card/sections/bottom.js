import { Icon } from "@chakra-ui/core";
import styles from "./bottom.module.css";

export default function CardBottom() {
  return (
    <div className={styles.cardBottom}>
      <Icon name="comment" color="rgb(101, 119, 134)" h="16.75px" w="16.75px" />
      <Icon name="retweet" color="rgb(101, 119, 134)" h="16.75px" w="16.75px" />
      <Icon name="like" color="rgb(101, 119, 134)" h="16.75px" w="16.75px" />
      <Icon name="share" color="rgb(101, 119, 134)" h="16.75px" w="16.75px" />
      <Icon name="stats" color="rgb(101, 119, 134)" h="16.75px" w="16.75px" />
    </div>
  );
}
