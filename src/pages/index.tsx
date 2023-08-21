/* eslint-disable @next/next/no-img-element */

import React from "react";
import Header from "components/Header/header";
import StickerPack, { IPackProps } from "components/StickerPack/stickerPack";
import { useDropzone } from "react-dropzone";
import stickers from "../../public/stickers/index";
import { Sticker } from "components/Sticker/sticker";
import { Canvas, IStickerWithPosition } from "components/Sticker/Canvas/canvas";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
//import handler from "./api/stickerpack";

export default function Edit() {
  const page = "Editor";
  const [image, setImage] = React.useState("");
  const onDrop = React.useCallback((acceptedFiles: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = function () {
      setImage(reader.result as any);
    };
  }, []);
  //const [picture, setPicture] = React.useState([]);
  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
    onDrop,
    multiple: false,
    onDragEnter: () => null,
    onDragOver: () => null,
    onDragLeave: () => null,
  });

  const Stickers = stickers;

  const packValues: IPackProps = {
    title: "Unknown sticker pack",
    author: "User",
    tags: ["unknown", "notMadeYet", "blank", "VeuropskaUnija"],
    stickers: Stickers,
  };

  function handleDragEnd(event: DragEndEvent) {
    console.log((event.activatorEvent as any).clientX);
    console.log(event.delta);

    var element = document.getElementById("canvas");
    if (element) {
      var topPos = element.getBoundingClientRect().top;
      var leftPos = element.getBoundingClientRect().left;
      let x =
        (event.activatorEvent as any).clientX + event.delta.x - 27 - leftPos;
      let y =
        (event.activatorEvent as any).clientY + event.delta.y - 27 - topPos;
      setCanvasStickers([
        ...canvasStickers,
        { src: event.active.data.current?.src, x: x, y: y },
      ]);
    }
  }

  const [canvasStickers, setCanvasStickers] = React.useState<
    IStickerWithPosition[]
  >([]);
  console.log(canvasStickers);
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className=" bg-cover min-h-screen flex flex-col bg-fixed bg-background font-kameron pb-10">
        <div className="h-[40vh] w-full  pointer-events-none absolute bg-gradient-to-b from-myYellow"></div>
        <Header page={page}></Header>
        <div className="edit flex-1">
          <div className="edit__sticker">
            {/* <button className="px-2 my-3 py-0.5 rounded-lg text-sm bg-myYellow">
            Choose another pack
          </button> */}
            <StickerPack
              title={packValues.title}
              author={packValues.author}
              tags={packValues.tags}
              stickers={packValues.stickers}
            ></StickerPack>
          </div>
          {image ? (
            <Canvas id="canvas" canvasStickers={canvasStickers}>
              <img className="edit__picture" src={image} />
            </Canvas>
          ) : (
            <div className="edit__upload-area relative w-[70%]">
              <div
                className="absolute inset-0 flex flex-col justify-center items-center"
                {...getRootProps()}
              >
                <input ref={inputRef} {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <>
                    <img
                      src="/images/iconEMark.png"
                      className="w-[50px] h-[130px] self-center"
                      alt="exclamation mark icon"
                    ></img>
                    <p className="my-4">Drop your pictures here or</p>
                    <button className="bg-myYellow rounded-md text-sm py-0.5 max-w-min whitespace-nowrap  p-2 ">
                      Browse folders
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DndContext>
  );
}
