import { useRouter } from "next/router";

export default function TweetsTabs({ tabs }) {
  const router = useRouter();
  const selectTab = tab => {
    router.push(`/tweets/${tab.toLowerCase()}`);
  };
  return (
    <>
      <ul className="tabs">
        {tabs &&
          tabs.map(t => (
            <li
              key={t}
              onClick={() => selectTab(t)}
              className={`tab ${
                router.pathname.includes(t.toLowerCase())
                  ? "selected"
                  : undefined
              }`}
            >
              {t}
            </li>
          ))}
      </ul>
      <style jsx>{`
        .tabs {
          display: flex;
          list-style-type: none;
          padding: 8px 0;
        }
        .tabs li {
          padding-right: 8px;
        }
        .selected {
          color: red;
        }
      `}</style>
    </>
  );
}
