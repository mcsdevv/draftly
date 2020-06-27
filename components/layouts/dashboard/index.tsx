import styles from "./dashboard.module.css";

import Divider from "@components/divider";
import Header from "@components/header/dashboard";

import RequireLogin from "@lib/client/requireLogin";

interface DashboardLayoutProps {
  children: React.ReactNode;
  name: string;
}

const DashboardLayout = ({ children, name }: DashboardLayoutProps) => (
  <RequireLogin>
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <h2 className={styles.heading}>{name}</h2>
      </div>
      <Divider />
      {children}
    </div>
  </RequireLogin>
);

export default DashboardLayout;
