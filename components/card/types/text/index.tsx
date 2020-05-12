import Linkify from "react-linkify";
import styles from "./text.module.css";

import CardTop from "../../sections/top";
import CardBottom from "../../sections/bottom";

import Characters from "../../../characters";
import Textarea from "../../../textarea";

interface Scope {
  handle: string;
  name: string;
}

interface TextProps {
  editing: boolean;
  editTweet: string;
  handleOnChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  scope: Scope;
  text: string;
}

const Text = ({
  editing,
  editTweet,
  handleOnChange,
  scope,
  text,
}: TextProps) => (
  <div className={styles.cardText}>
    <CardTop handle={scope?.handle} name={scope?.name} />
    <Linkify>
      {!editing ? (
        text
      ) : (
        <Textarea onChange={handleOnChange} value={editTweet} />
      )}
    </Linkify>
    {editing && <Characters progress={(editTweet.length / 280) * 100} />}
    <CardBottom />
  </div>
);

export default Text;
