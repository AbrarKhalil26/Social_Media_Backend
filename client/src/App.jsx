import { RouterProvider } from "react-router-dom";
import { router } from "./routing/AppRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import { customTheme } from "./lib/flowbiteTheme";
import { ThemeProvider } from "flowbite-react";
import { HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <HelmetProvider>
          <ThemeProvider theme={{ theme: customTheme }}>
            <RouterProvider router={router} />
            <ToastContainer />
          </ThemeProvider>
        </HelmetProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
