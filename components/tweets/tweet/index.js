import styles from "./tweet.module.css";

import Card from "../../card";

const Tweet = ({
  children,
  editing,
  editTweet,
  handleOnChange,
  metadata,
  scope,
  text,
}) => (
  <div className={styles.container}>
    <div className={styles.tweet}>
      <div className={styles.avatarWrapper}>
        <img className={styles.avatar} src={scope.avatar} />
      </div>
      <Card
        editing={editing}
        editTweet={editTweet}
        handleOnChange={handleOnChange}
        metadata={metadata}
        scope={scope}
        text={text}
      />
    </div>
    {children}
  </div>
);

export default Tweet;
