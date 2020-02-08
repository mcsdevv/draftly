import { useRouter } from "next/router";

import { List, ListItem, ListIcon } from "@chakra-ui/core";

export default function Tabs({ section, tabs }) {
  const router = useRouter();
  const selectTab = tab => {
    router.push(`/${section}/${tab.toLowerCase()}`);
  };
  return (
    <>
      <List className="tabs" display="flex">
        {tabs &&
          tabs.map(t => (
            <ListItem
              color={
                router.pathname.includes(t.toLowerCase()) ? "red" : undefined
              }
              p="4"
              cursor="pointer"
              key={t}
              onClick={() => selectTab(t)}
            >
              {t}
            </ListItem>
          ))}
      </List>
      <style jsx>{`
        // .tabs {
        //   display: flex;
        //   list-style-type: none;
        //   padding: 8px 0;
        // }
        // .tabs li {
        //   cursor: pointer;
        //   padding-right: 8px;
        // }
        // .selected {
        //   color: red;
        // }
      `}</style>
    </>
  );
}
