import Large from "./types/large";
import Small from "./types/small";
import Text from "./types/text";

import removeUrl from "@lib/client/removeUrl";

interface Metadata {
  cardType: string;
}

interface CardProps {
  editing?: boolean;
  editTweet?: string;
  handleOnChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  metadata: Metadata;
  scope: any;
  text: string;
}

const Card = ({ metadata, scope, text }: CardProps) => {
  // * Removes URL if it is the last item present in the tweet text
  const tweetText = removeUrl(metadata, text);

  if (metadata?.cardType === "summary-large") {
    return <Large metadata={metadata} scope={scope} text={tweetText} />;
  }
  if (metadata?.cardType === "summary") {
    return <Small metadata={metadata} scope={scope} text={tweetText} />;
  }
  return <Text scope={scope} text={tweetText} />;
};

export default Card;
