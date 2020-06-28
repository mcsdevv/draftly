import { useRouter } from "next/router";

import DashboardLayout from "@components/layouts/dashboard";

const Publish = () => {
  const router = useRouter();
  const { twuid } = router.query;
  return <h1>{twuid}</h1>;
};

Publish.getLayout = (page) => (
  <DashboardLayout name="Publish">{page}</DashboardLayout>
);

export default Publish;
