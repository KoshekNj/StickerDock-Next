import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Sticker } from "../sticker";
import stickers from "../../../../public/stickers/index";

export interface IStickerWithPosition {
  src: string;
  x: number;
  y: number;
}
interface ICanvasProps {
  id: string;
  children: React.ReactNode;
  canvasStickers: IStickerWithPosition[];
}
export function Canvas(props: ICanvasProps) {
  const test = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: test.isOver ? "0.5" : "1",
  };

  return (
    <div className="relative" id={props.id} ref={test.setNodeRef} style={style}>
      {props.canvasStickers.map((sticker) => {
        return (
          <Sticker
            src={sticker.src}
            id={sticker.src}
            key={sticker.src}
            style={{
              position: "absolute",
              top: sticker.y + "px",
              left: sticker.x + "px",
              zIndex: "10",
            }}
          />
        );
      })}

      {props.children}
    </div>
  );
}
