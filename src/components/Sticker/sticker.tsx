import { useDrag } from "react-dnd";
import { ItemTypes } from "pages/_app";

export interface IStickerProps {
  path: string;
  x: number;
  y: number;
}
export const Sticker = ({ path, x, y }: IStickerProps) => {
  const [collected, drag] = useDrag(() => ({
    type: ItemTypes.STICKER,
    collect: (monitor) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  }));
  console.log(collected);
  return (
    <img
      className="fixed -translate-x-1/2 -translate-y-1/2"
      ref={drag}
      style={{
        opacity: collected.isDragging ? 0.5 : 1,
        left: x,
        top: y,
        cursor: "move",
      }}
      src={path}
      alt="sticker"
    ></img>
  );
};
