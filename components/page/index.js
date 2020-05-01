import styles from "./page.module.css";

import Button from "../button";
import Divider from "../divider";
import Header from "../header";

export default function Page({
  buttonText,
  children,
  divider = true,
  name,
  onClick,
}) {
  console.log("renderrrr");
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <h2 className={styles.heading}>{name}</h2>
        {buttonText && <Button onClick={onClick}>{buttonText}</Button>}
      </div>
      {divider && <Divider />}
      {children}
    </div>
  );
}
