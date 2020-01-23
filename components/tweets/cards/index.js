import SummaryLarge from "./summary-large";
import Summary from "./summary";
import Text from "./text";

export default function Card({
  editing,
  editTweet,
  handleOnChange,
  metadata,
  scope,
  text
}) {
  if (metadata.cardType === "summary-large") {
    return (
      <SummaryLarge
        editing={editing}
        editTweet={editTweet}
        handleOnChange={handleOnChange}
        meta={metadata}
        scope={scope}
        text={text}
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
        text={text}
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
        text={text}
      />
    );
  }
}
