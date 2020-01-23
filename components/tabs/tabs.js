import { useRouter } from "next/router";

export default function Tabs({ section, tabs }) {
  const router = useRouter();
  const selectTab = tab => {
    router.push(`/${section}/${tab.toLowerCase()}`);
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
          cursor: pointer;
          padding-right: 8px;
        }
        .selected {
          color: red;
        }
      `}</style>
    </>
  );
}
