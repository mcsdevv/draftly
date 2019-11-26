import { useUserState } from "../hooks/useUserState";
import { useContextState } from "../hooks/useContextState";

import Header from "../components/header";

export default function Settings() {
  const user = useUserState();
  const { contexts } = useContextState();
  console.log("SETTINGS", contexts);
  return (
    <>
      <Header />
      <main>
        <h1>Settings Page</h1>
        {contexts && contexts.selected.name}
      </main>
      <style jsx>{``}</style>
    </>
  );
}
