import type { ISidebarItem } from "@/types";

export const generateRoutes = (sidebar: ISidebarItem[]) => {
  return sidebar.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
    }))
  );
};
