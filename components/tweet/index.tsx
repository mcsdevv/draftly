import styles from "./tweet.module.css";

// * Components
import Card from "../card";

interface TweetProps {
  children?: React.ReactNode;
  editing: boolean;
  editTweet: string;
  handleOnChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  metadata: any;
  scope: any;
  text: string;
}

const Tweet = ({
  children,
  editing,
  editTweet,
  handleOnChange,
  metadata,
  scope,
  text,
}: TweetProps) => (
  <div className={styles.container}>
    <div className={styles.tweet}>
      <div className={styles.avatarWrapper}>
        <img className={styles.avatar} src={scope?.avatar} />
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
