import "styles/globals.scss";
import type { AppProps } from "next/app";
import { DndContext } from "@dnd-kit/core";

export const ItemTypes = {
  STICKER: "sticker",
};

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
