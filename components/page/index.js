import styles from "./page.module.css";

import Divider from "../divider";
import Header from "../header";

export default function Page({ children, name }) {
  return (
    <div className={styles.page}>
      <Header />
      <h2 className={styles.heading}>{name}</h2>
      <Divider />
      {children}
    </div>
  );
}
