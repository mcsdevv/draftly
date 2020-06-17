import { useRouter } from "next/router";

import RequireLogin from "@lib/client/requireLogin";

function Tweets() {
  const router = useRouter();
  router.push("/tweets/drafts");
}

export default () => RequireLogin(Tweets);
