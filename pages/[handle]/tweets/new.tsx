// * Components
import Compose from "@components/compose";
import DashboardLayout from "@components/layouts/pages/dashboard";

function Create() {
  return <Compose />;
}

Create.getLayout = (page: React.ReactNode) => (
  <DashboardLayout name="Create Tweet">{page}</DashboardLayout>
);

export default Create;
