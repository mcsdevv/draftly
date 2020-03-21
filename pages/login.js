import { useProfile } from "../hooks";

import Page from "../components/page";

export default function Landing() {
  const { user } = useProfile();
  return (
    <Page>
      <h1>Really great marketing content...</h1>
    </Page>
  );
}
