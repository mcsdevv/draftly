import Linkify from "react-linkify";

import CardTop from "../sections/top";
import CardBottom from "../sections/bottom";
// import Characters from "../sections/characters";

import Characters from "../../characters";

import styles from "./text.module.css";

import Textarea from "../../textarea";

export default function Text({
  editing,
  editTweet,
  handleOnChange,
  scope,
  text,
}) {
  return (
    <div className={styles.cardText}>
      <CardTop handle={scope.handle} name={scope.name} />
      <Linkify
        properties={{
          target: "_blank",
          style: { color: "red", fontWeight: "bold" },
        }}
      >
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
}
