import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useScope, useProfile } from "../../hooks";

export default function TweetsTabs() {
  const router = useRouter();
  const tabs = ["Drafts", "Reviews", "Published"];
  const selectTab = tab => {
    router.push(`/tweets/${tab.toLowerCase()}`);
  };
  return (
    <div>
      {tabs &&
        tabs.map(t => (
          <button key={t} onClick={() => selectTab(t)}>
            {t}
          </button>
        ))}
    </div>
  );
}
