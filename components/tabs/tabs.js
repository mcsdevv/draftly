import { useRouter } from "next/router";

import { List, ListItem } from "@chakra-ui/core";

export default function Tabs({ section, tabs }) {
  const router = useRouter();
  const selectTab = tab => {
    router.push(`/${section}/${tab.toLowerCase()}`);
  };
  return (
    <List display="flex">
      {tabs &&
        tabs.map(t => (
          <ListItem
            fontWeight={
              router.pathname.includes(t.toLowerCase()) ? 700 : undefined
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
  );
}
