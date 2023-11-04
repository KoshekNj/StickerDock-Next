import "styles/globals.scss";
import type { AppProps } from "next/app";
import { DndContext } from "@dnd-kit/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { useRouter } from "next/router";

export const ItemTypes = {
  STICKER: "sticker",
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  React.useEffect(() => {
    if (router.asPath !== "/login" && router.asPath !== "/signup") {
      if (localStorage.id === undefined) {
        router.push("/signup");
      }
    }
  }, [router.asPath]);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
