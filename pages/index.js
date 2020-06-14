import Page from "../components/page";

import { useTweets, useUser } from "../hooks";

const Landing = () => {
  const tweets = useTweets();
  const user = useUser();
  console.log("TWEEEEEETSt", tweets);
  console.log("USERRRR", user);
  return (
    <Page divider={false}>
      <h2>Draft...</h2>
      <h2>Review...</h2>
      <h2>Publish...</h2>
    </Page>
  );
};

export default Landing;
