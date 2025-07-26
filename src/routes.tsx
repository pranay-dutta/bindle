import { createBrowserRouter } from "react-router";
import Layout from "./Layout/Layout";
import Homepage from "./pages/Homepage";
import BookDetailPage from "./pages/BookDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "details/:title",
        element: <BookDetailPage />
      }
    ]
  }
]);

export default router;
