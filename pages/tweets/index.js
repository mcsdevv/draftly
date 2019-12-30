import { useRouter } from "next/router";

import TweetsTabs from "../../components/tabs/tweets";

import RequireLogin from "../../lib/requireLogin";

function Tweets() {
  const router = useRouter();
  router.push("/tweets/drafts");
  return <TweetsTabs />;
}

export default () => RequireLogin(Tweets);
