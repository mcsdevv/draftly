// * Libraries
import Linkify from "react-linkify";

// * Components
import CardBottom from "../../sections/bottom";
import CardTop from "../../sections/top";

// * Styles
import styles from "./text.module.css";

interface Scope {
  handle: string;
  name: string;
}

interface TextProps {
  scope: Scope;
  text: string;
}

const Text = ({ scope, text }: TextProps) => (
  <div className={styles.text}>
    <CardTop handle={scope?.handle} name={scope?.name} />
    <p className={styles.cardText}>
      <Linkify>{text}</Linkify>
    </p>
    <CardBottom />
  </div>
);

export default Text;
