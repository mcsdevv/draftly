// * Components
import Card from "../card";

// * Styles
import styles from "./tweet.module.css";

interface TweetProps {
  children?: React.ReactNode;
  metadata: any;
  scope: any;
  text: string;
}

const Tweet = ({ children, metadata, scope, text }: TweetProps) => (
  <div className={styles.container}>
    <div className={styles.tweet}>
      <div className={styles.avatarWrapper}>
        <img className={styles.avatar} src={scope?.avatar} />
      </div>
      <Card metadata={metadata} scope={scope} text={text} />
    </div>
    {children}
  </div>
);

export default Tweet;
