/* eslint-disable @next/next/no-img-element */

import React from "react";
import Header from "components/Header/header";
import StickerPack, { IPackProps } from "components/StickerPack/stickerPack";
import { useDropzone } from "react-dropzone";
import { Canvas, IStickerWithPosition } from "components/Sticker/Canvas/canvas";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useCreateImage } from "services/createImage";
import { useGetStickerPacksByUserId } from "services/getStickerPacksByUserId";
import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { toBlob } from "html-to-image";

import type { OurFileRouter } from "../db/uploadthing";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();

const { useUploadThing } = generateReactHelpers();

export default function Edit() {
  const page = "Editor";
  const [image, setImage] = React.useState("");
  const [file, setFile] = React.useState<any>("");
  const [index, setIndex] = React.useState(0);

  const { mutateAsync: createImage } = useCreateImage();
  let userId: string | null = null;
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("id");
  }

  const imageupload = useUploadThing("imageUploader");

  const onDrop = React.useCallback((acceptedFiles: any) => {
    const reader = new FileReader();
    setFile(acceptedFiles[0]);
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = function () {
      setImage(reader.result as any);
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
    onDrop,
    multiple: false,
    onDragEnter: () => null,
    onDragOver: () => null,
    onDragLeave: () => null,
  });

  const { data: packValues } = useGetStickerPacksByUserId(
    Number(userId),
    "",
    ""
  );
  function handleDragEnd(event: DragEndEvent) {
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

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className=" bg-cover min-h-screen flex flex-col bg-fixed bg-background font-kameron pb-10">
        <div className="h-[40vh] w-full  pointer-events-none absolute bg-gradient-to-b from-myYellow"></div>
        <Header page={page}></Header>
        <div className="edit flex-1">
          <div className="edit__sticker">
            <div className="flex justify-between px-5 mb-3 w-[165px]">
              <button
                disabled={index === 0 ? true : false}
                className="rounded-full bg-myYellow px-2 disabled:bg-slate-300"
                onClick={() => {
                  setIndex((count) => count - 1);
                }}
              >
                ⇐
              </button>
              <button
                disabled={packValues?.length === index + 1 ? true : false}
                className="rounded-full bg-myYellow px-2 disabled:bg-slate-300"
                onClick={() => {
                  setIndex((count) => count + 1);
                }}
              >
                ⇒
              </button>
            </div>
            {packValues && packValues.length > 0 ? (
              <StickerPack
                labelUrl={packValues?.[index].labelUrl}
                title={packValues?.[index].name}
                author={packValues?.[index].userId}
                tags={packValues?.[index].tags}
                stickers={packValues?.[index].stickers}
              ></StickerPack>
            ) : (
              <p>You do not have any sticker packs yet...</p>
            )}
          </div>
          {image ? (
            <>
              <Canvas id="canvas" canvasStickers={canvasStickers}>
                <img className="edit__picture" src={image} />
              </Canvas>
              <div>
                <button onClick={() => setCanvasStickers([])}>Reset</button>
                <button
                  onClick={() => {
                    toBlob(document.getElementById("canvas") as any).then(
                      (blob) => {
                        let file2 = new File([blob as Blob], "file_name.png", {
                          lastModified: 1534584790000,
                          type: "image/png",
                        });
                        imageupload.startUpload([file2]).then((res) => {
                          const imageUrl = res?.[0].url as string;
                          createImage({
                            userId: Number(userId),
                            imageUrl: imageUrl,
                          });
                        });
                      }
                    );
                  }}
                >
                  Save
                </button>
              </div>
            </>
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
