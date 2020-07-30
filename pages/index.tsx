// * Components
import DashboardLayout from "@components/layouts/dashboard";

const Landing = () => <><h1>Draft & Publish</h1><button onClick={()=> throw new Error}>Throw Error</button></>;

Landing.getLayout = (page: React.ReactNode) => (
  <DashboardLayout name="Landing">{page}</DashboardLayout>
);

export default Landing;

// TODO Change to marketing layout
