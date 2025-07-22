import { RouterProvider } from "react-router";
import { Provider } from "./ui/provider";
import router from "./routes";

const Providers = () => {
  return (
    <Provider defaultTheme="light">
      <RouterProvider router={router} />
    </Provider>
  );
};
export default Providers;
