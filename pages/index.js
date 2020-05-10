import Page from "../components/page";
console.log("KEYYYYY", process.env.AUTH0_PUBLIC_KEY);
const Landing = () => (
  <Page divider={false}>
    <h2>Draft...</h2>
    <h2>Review...</h2>
    <h2>Publish...</h2>
  </Page>
);

export default Landing;
