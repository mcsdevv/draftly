import { useRouter } from "next/router";

import DashboardLayout from "@components/layouts/dashboard";

const Draft = () => {
  const router = useRouter();
  const { twuid } = router.query;
  return <h1>{twuid}</h1>;
};

Draft.getLayout = (page) => (
  <DashboardLayout name="Draft">{page}</DashboardLayout>
);

export default Draft;
