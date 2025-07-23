import { createBrowserRouter } from "react-router";
import Layout from "./Layout/Layout";
import Homepage from "./pages/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
]);

export default router;
