import { RouterProvider } from "react-router";
import "swiper/swiper-bundle.css";
import router from "./routes";
import { Provider } from "./ui/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider defaultTheme="light">
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </Provider>
    </QueryClientProvider>
  );
};
export default Providers;
