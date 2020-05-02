import styles from "./page.module.css";

import {
  useDrafts,
  useProfile,
  usePublished,
  useReviews,
  useScope,
} from "../../hooks";

import Button from "../button";
import Divider from "../divider";
import Header from "../header";

const Page = ({ buttonText, children, divider = true, name, onClick }) => {
  const { drafts } = useDrafts();
  const { teams, user } = useProfile();
  const { published } = usePublished();
  const { reviews } = useReviews();
  const { scope } = useScope();
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
};

// Page.whyDidYouRender = true;

export default Page;
