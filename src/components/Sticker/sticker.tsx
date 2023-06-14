// import { useDrag } from "react-dnd";
// import { ItemTypes } from "pages/_app";

// export interface IStickerProps {
//   path: string;
//   x: number;
//   y: number;
// }
// export const Sticker = ({ path, x, y }: IStickerProps) => {
//   const [collected, drag] = useDrag(() => ({
//     type: ItemTypes.STICKER,
//     collect: (monitor) => {
//       return {
//         isDragging: !!monitor.isDragging(),
//       };
//     },
//   }));
//   console.log(collected);
//   return (
//     <img
//       className="fixed -translate-x-1/2 -translate-y-1/2"
//       ref={drag}
//       style={{
//         opacity: collected.isDragging ? 0.5 : 1,
//         left: x,
//         top: y,
//         cursor: "move",
//       }}
//       src={path}
//       alt="sticker"
//     ></img>
//   );
// };

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
