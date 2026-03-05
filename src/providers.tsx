import "swiper/swiper-bundle.css";
import { Provider } from "./ui/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CheckboxProvider } from "@/components/checkbox/checkboxContext";
import { ClerkProvider } from "@clerk/clerk-react";

interface ProvidersProps {
  children: React.ReactNode;
}

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!CLERK_PUBLISHABLE_KEY) {
  console.warn(
    "Clerk publishable key is not set. Authentication features may not work properly."
  );
}
const queryClient = new QueryClient();

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <CheckboxProvider>
          <Provider defaultTheme="light">
            {children}
            <ReactQueryDevtools position="bottom" buttonPosition="bottom-left"/>
          </Provider>
        </CheckboxProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};
export default Providers;
