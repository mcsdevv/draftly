// * Libraries
import { useEffect } from "react";
import { useRouter } from "next/router";

function Settings() {
  const router = useRouter();
  useEffect(() => {
    router.push(router.asPath + "/account");
  });
  return null;
}

export default Settings;
