import { createBrowserRouter } from "react-router";
import Layout from "./Layout/Layout";
import Homepage from "./pages/Homepage";
import BookDetailPage from "./pages/BookDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import RecommendationPage from "./pages/RecommendationPage";
import NewReleasePage from "./pages/NewReleasePage";
import EbookPage from "./pages/EbookPage";
import SalePage from "./pages/SalePage";
import CategoryPage from "./pages/CategoryPage";

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
      },
      {
        path: "cart",
        element: <CartPage />
      },
      {
        path: "checkout",
        element: <CheckoutPage />
      },
      {
        path: "search",
        element: <SearchResultsPage />
      },
      {
        path: "categories/:category",
        element: <CategoryPage />
      },
      {
        path: "recommendations",
        element: <RecommendationPage />
      },
      {
        path: "new-releases",
        element: <NewReleasePage />
      },
      {
        path: "ebooks",
        element: <EbookPage />
      },
      {
        path: "sale",
        element: <SalePage />
      }
    ]
  }
]);

export default router;
