// * Components
import Dashboard from "@components/dashboard";
import DashboardLayout from "@components/layouts/dashboard";

function DashboardPage() {
  return <Dashboard />;
}

DashboardPage.getLayout = (page: React.ReactNode) => (
  <DashboardLayout name="Dashboard">{page}</DashboardLayout>
);

export default DashboardPage;
