import Page from "../components/page";
import CardPlaceholder from "../components/placeholders/card";

export default function Landing() {
  return (
    <Page divider={false}>
      <h2>Draft...</h2>
      <h2>Review...</h2>
      <h2>Publish...</h2>
      <CardPlaceholder />
    </Page>
  );
}
