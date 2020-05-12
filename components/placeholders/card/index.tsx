import cn from "classnames";
import styles from "./card.module.css";
import Bottom from "../../card/sections/bottom";

const CardPlaceholder = () => (
  <div className={styles.container}>
    <div className={styles.avatar} />
    <div className={styles.main}>
      <div className={styles.top}>
        <div className={styles.topText} />
        <svg
          className={styles.arrow}
          focusable="false"
          role="presentation"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z"
          ></path>
        </svg>
      </div>
      <div className={styles.contentWrapper}>
        <div className={cn(styles.content, styles.contentOne)} />
        <div className={cn(styles.content, styles.contentTwo)} />
      </div>
      <div className={styles.metaWrapper}>
        <div className={styles.image} />
        <div className={styles.metaContent}>
          <div className={cn(styles.metaItem, styles.metaTitle)} />
          <div className={cn(styles.metaItem, styles.metaDescriptionOne)} />
          <div className={cn(styles.metaItem, styles.metaDescriptionTwo)} />
          <div className={cn(styles.metaItem, styles.metaLink)} />
        </div>
      </div>
      <Bottom />
    </div>
  </div>
);

export default CardPlaceholder;
