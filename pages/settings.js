import { useUserState } from "../hooks/useUserState";

import Header from "../components/header";

export default function Dashboard() {
  const user = useUserState();
  return (
    <>
      <Header />
      <main>
        <h1>Settings Page</h1>
      </main>
      <style jsx>{``}</style>
    </>
  );
}
