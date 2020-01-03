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
    <ul className="flex border-b">
      {tabs &&
        tabs.map(t => (
          <li
            key={t}
            onClick={() => selectTab(t)}
            className={`mr-1 py-2 px-4 text-blue-500 ${
              router.pathname.includes(t.toLowerCase())
                ? "border-l border-t border-r rounded-t -mb-px text-blue-700"
                : undefined
            }`}
          >
            {t}
          </li>
        ))}
    </ul>
  );
}
