import { useRouter } from "next/router";

import { List, ListItem, ListIcon } from "@chakra-ui/core";

export default function Tabs({ section, tabs }) {
  const router = useRouter();
  const selectTab = tab => {
    router.push(`/${section}/${tab.toLowerCase()}`);
  };
  return (
    <>
      <List className="tabs">
        {tabs &&
          tabs.map(t => (
            <ListItem
              key={t}
              onClick={() => selectTab(t)}
              className={`tab ${
                router.pathname.includes(t.toLowerCase())
                  ? "selected"
                  : undefined
              }`}
            >
              {t}
            </ListItem>
          ))}
      </List>
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
