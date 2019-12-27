import Tabs from "../../components/tabs";

import RequireLogin from "../../lib/requireLogin";

function Settings() {
  console.log("setttt");
  return (
    <>
      <Tabs />
      <h1>Settings Page</h1>
      <style jsx>{``}</style>
    </>
  );
}

export default () => RequireLogin(Settings);
