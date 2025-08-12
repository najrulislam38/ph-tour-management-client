import App from "@/App";
import AdminLayout from "@/components/layout/AdminLayout";
import About from "@/pages/About";
import Analytics from "@/pages/Analytics";
import { createBrowserRouter } from "react-router";
// import App from "./../App"

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App/>
    Component: App,
    children: [
      {
        path: "about",
        Component: About,
      },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        path: "analytics",
        Component: Analytics,
      },
    ],
  },
]);

export default router;
