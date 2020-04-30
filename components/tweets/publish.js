import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";

import Tweet from "../tweet";

export default function Publish({ tweet }) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet.text);
  const [saving, setSaving] = useState(false);
  const { scope } = useContext(ScopeContext);
  const { user, teams } = useProfile();
  // TODO Account for multiple Twitter card types - https://www.oncrawl.com/oncrawl-seo-thoughts/a-complete-guide-to-twitter-cards/
  return (
    <Tweet
      editing={editing}
      editTweet={tweet}
      metadata={tweet.metadata}
      scope={scope}
      text={tweet.text}
    />
  );
}
