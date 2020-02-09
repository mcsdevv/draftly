import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import Cookies from "js-cookie";
import parseJwt from "../../lib/parseJwt";
import getMeta from "../../lib/getMeta";

import { Box, Heading, Textarea } from "@chakra-ui/core";
import DefaultButton from "../buttons/default";

export default function ComposeTweet({
  drafting,
  revalidate,
  setDrafting,
  startDraft
}) {
  const [tweet, setTweet] = useState("");
  const [saving, setSaving] = useState(false);
  const { scope } = useContext(ScopeContext);
  const handleSaveDraft = async () => {
    setSaving(true);
    const metadata = await getMeta(tweet);
    const id = Cookies.get("id_token");
    const { name } = parseJwt(id);
    const url = `/api/tweet/draft/create/${scope.handle}`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        creator: name,
        metadata,
        tweet
      })
    });
    if (res.status === 200) {
      revalidate();
      setDrafting(false);
      setSaving(false);
      setTweet("");
    }
  };
  const handleOnChange = e => {
    // TODO Improve character limit handling
    if (tweet.length < 280) {
      setTweet(e.target.value);
    } else {
      alert("over the limit bud");
    }
  };
  return (
    <Box display="flex" flexDirection="column" h="100%" justifyContent="center">
      {!drafting ? (
        <DefaultButton handleOnClick={startDraft} text="Create Draft" />
      ) : !saving ? (
        <>
          <Textarea
            placeholder="Draft your tweet..."
            onChange={handleOnChange}
            value={tweet}
          />
          <DefaultButton
            disabled={!tweet}
            handleOnClick={handleSaveDraft}
            text="Save Draft"
          />
        </>
      ) : (
        <Heading as="h2">Saving Draft...</Heading>
      )}
    </Box>
  );
}
