import styles from "./marketing.module.css";

import Divider from "@components/divider";
import Header from "@components/header/dashboard";

interface MarketingLayoutProps {
  children: React.ReactNode;
  name?: string;
}

const MarketingLayout = ({ children, name }: MarketingLayoutProps) => (
  <div className={styles.page}>
    <Header />
    <div className={styles.content}>
      <h2 className={styles.heading}>{name}</h2>
    </div>
    {name && <Divider />}
    {children}
  </div>
);

export default MarketingLayout;
