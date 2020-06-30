import useScope from "@hooks/use-scope";

import Tweet from "../../tweet";

interface PublishProps {
  tweet: any;
}

const Publish = ({ tweet }: PublishProps) => {
  const { scope } = useScope();
  // TODO Account for multiple Twitter card types - https://www.oncrawl.com/oncrawl-seo-thoughts/a-complete-guide-to-twitter-cards/
  return (
    <Tweet
      editing={false}
      editTweet={tweet}
      handleOnChange={() => undefined}
      metadata={tweet.metadata}
      scope={scope}
      text={tweet.text}
    />
  );
};

export default Publish;
