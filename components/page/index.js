import styles from "./page.module.css";

import Divider from "../divider";
import Header from "../header";

export default function Page({ children, divider = true, name }) {
  return (
    <div className={styles.page}>
      <Header />
      <h2 className={styles.heading}>{name}</h2>
      {divider && <Divider />}
      {children}
    </div>
  );
}
