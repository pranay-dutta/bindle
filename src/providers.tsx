import "swiper/swiper-bundle.css";
import { Provider } from "./ui/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();
const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider defaultTheme="light">
        {children}
        <ReactQueryDevtools />
      </Provider>
    </QueryClientProvider>
  );
};
export default Providers;
