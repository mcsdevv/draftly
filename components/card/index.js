import SummaryLarge from "./types/summary-large";
import Summary from "./types/summary";
import Text from "./types/text";

import removeUrl from "../../lib/removeUrl";

export default function Card({
  editing,
  editTweet,
  handleOnChange,
  metadata,
  scope,
  text
}) {
  // * Removes URL if it is the last item present in the tweet text
  const tweetText = removeUrl(metadata, text);
  if (metadata.cardType === "summary-large") {
    return (
      <SummaryLarge
        editing={editing}
        editTweet={editTweet}
        handleOnChange={handleOnChange}
        meta={metadata}
        scope={scope}
        text={tweetText}
      />
    );
  }
  if (metadata.cardType === "summary") {
    return (
      <Summary
        editing={editing}
        editTweet={editTweet}
        handleOnChange={handleOnChange}
        meta={metadata}
        scope={scope}
        text={tweetText}
      />
    );
  }
  if (metadata.cardType === "text") {
    return (
      <Text
        editing={editing}
        editTweet={editTweet}
        handleOnChange={handleOnChange}
        scope={scope}
        text={tweetText}
      />
    );
  }
}
