import { createBrowserRouter } from "react-router";
import { ContentLayout } from "./Layout/ContentLayout";
import RootLayout from "./Layout/RootLayout";
import {
  HomePage,
  Addresses,
  BookDetailPage,
  CartPage,
  CategoryPage,
  CheckoutPage,
  EbookPage,
  NewReleasePage,
  RecommendationPage,
  SalePage,
  SearchResultsPage
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        element: <ContentLayout />,
        children: [
          { path: "details/:title", element: <BookDetailPage /> },
          { path: "cart", element: <CartPage /> },
          { path: "checkout", element: <CheckoutPage /> },
          { path: "search", element: <SearchResultsPage /> },
          { path: "categories/:category", element: <CategoryPage /> },
          { path: "recommendations", element: <RecommendationPage /> },
          { path: "new-releases", element: <NewReleasePage /> },
          { path: "ebooks", element: <EbookPage /> },
          { path: "addresses", element: <Addresses /> },
          { path: "sale", element: <SalePage /> }
        ]
      }
    ]
  }
]);

export default router;
