import React from "react";
import { useDraggable } from "@dnd-kit/core";

interface IStickerProps {
  id: string;
  src: string;
  style?: any;
}

export const Sticker = (props: IStickerProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      src: props.src,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={{ ...style, ...(props.style || {}) }}
      {...listeners}
      {...attributes}
    >
      <img className="max-w-[40px] m-3" src={props.src}></img>
    </button>
  );
};
