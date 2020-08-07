// * Libraries
import Linkify from "react-linkify";

// * Modulz
import { Textarea } from "@modulz/radix";

// * Components
import CardBottom from "../../sections/bottom";
import CardTop from "../../sections/top";
import Characters from "../../../characters";

// * Styles
import styles from "./text.module.css";

interface Scope {
  handle: string;
  name: string;
}

interface TextProps {
  editing?: boolean;
  editTweet?: string;
  handleOnChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
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
    {editing && editTweet && (
      <Characters progress={(editTweet.length / 280) * 100} />
    )}
    <CardBottom />
  </div>
);

export default Text;
