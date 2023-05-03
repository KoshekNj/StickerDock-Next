import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../App";
import { IStickerProps } from "../sticker";

interface ICanvasProps {
  // setStickers: (arg0: IStickerProps[] | () => void;
  setStickers: any;
}
export const Canvas = ({ setStickers }: ICanvasProps) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.STICKER,
      drop: (item, monitor) => console.log(item, monitor),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  console.log(isOver);
  return (
    <div
      onDragOver={(e) => {
        console.log("dragalica");
        setStickers((stickers: IStickerProps[]) => [
          {
            ...stickers[0],
            x: e.pageX,
            y: e.pageY,
          },
        ]);
      }}
      ref={drop}
      className="absolute h-screen right-0 w-1/2 border border-red-500"
    ></div>
  );
};
