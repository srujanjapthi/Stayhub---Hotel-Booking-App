import React from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { toast, Toaster } from "sonner";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";

type ToastMessage = {
  message: string;
  description?: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  isLoading: boolean;
  stripePromise: Promise<Stripe | null>;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError, isLoading } = useQuery(
    "validateToken",
    apiClient.validateToken,
    {
      retry: false,
    },
  );

  return (
    <AppContext.Provider
      value={{
        showToast: ({ message, type, description }) => {
          switch (type) {
            case "SUCCESS":
              toast.success(message, { description });
              break;

            case "ERROR":
              toast.error(message, { description });
              break;
          }
        },
        isLoggedIn: !isError,
        isLoading,
        stripePromise,
      }}
    >
      {children}
      <Toaster closeButton richColors />
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  return context as AppContext;
};
