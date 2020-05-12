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

interface PageProps {
  buttonText?: string;
  children: React.ReactNode;
  divider?: boolean;
  name: string;
  onClick: () => void;
}

const Page = ({
  buttonText,
  children,
  divider = true,
  name,
  onClick,
}: PageProps) => {
  const { drafts } = useDrafts();
  const { teams, user } = useProfile();
  const { published } = usePublished();
  const { reviews } = useReviews();
  const { scope } = useScope();
  console.log(drafts, published, reviews, scope, teams, user);
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

export default Page;
