import DashboardLayout from "@components/layouts/dashboard";

function Create() {
  return <h2>Let's create a tweet!</h2>;
}

Create.getLayout = (page) => (
  <DashboardLayout name="Create Tweet">{page}</DashboardLayout>
);

export default Create;
