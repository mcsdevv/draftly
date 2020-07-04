import styles from "./dashboard.module.css";

import { Divider, Heading } from "@modulz/radix";
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
        <Heading size={5} weight="medium">
          {name}
        </Heading>
      </div>
      <Divider mb={4} />
      {children}
    </div>
  </RequireLogin>
);

export default DashboardLayout;
