import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
 import { ToastContainer } from "react-toastify";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

 const queryClient = new QueryClient();




const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <ToastContainer position="top-center" />
        <App />
      </ClerkProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);

