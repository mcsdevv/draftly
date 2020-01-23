import Tabs from "./tabs";

export default function TweetsTabs() {
  const tabs = ["Drafts", "Reviews", "Published"];
  return <Tabs section="tweets" tabs={tabs} />;
}
