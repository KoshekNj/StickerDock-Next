import Header from "components/Header/header";
import { Field, Form, Formik } from "formik";
import { userAgent } from "next/server";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useCreateStickerPack } from "services/createStickerPack";
import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { toBlob } from "html-to-image";

import type { OurFileRouter } from "../db/uploadthing";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();

const { useUploadThing } = generateReactHelpers();

const Create = () => {
  const page = "My profile";
  const [image, setImage]: any = React.useState();
  const [imagePreview, setImagePreview]: any = React.useState();
  const [stickers, setStickers]: any = React.useState([]);
  const [stickersPreview, setStickersPreview]: any = React.useState([]);
  const { mutateAsync: createStickerPack } = useCreateStickerPack();
  const imageupload = useUploadThing("imageUploader");
  let userId;
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("id");
  }

  const onDrop = React.useCallback((acceptedFiles: any) => {
    if (acceptedFiles.length === 1) {
      const reader = new FileReader();
      setImage(acceptedFiles[0]);
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = function () {
        setImagePreview(reader.result as string);
      };
    } else {
      for (let i = 0; i < acceptedFiles.length; i++) {
        const reader = new FileReader();
        setStickers((stickers: any) => [...stickers, acceptedFiles[i]]);
        console.log(acceptedFiles);
        reader.readAsDataURL(acceptedFiles[i]);
        reader.onload = function () {
          setStickersPreview((stickers: any) => [...stickers, reader.result]);
        };
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
    onDrop,
    multiple: false,
    onDragEnter: () => null,
    onDragOver: () => null,
    onDragLeave: () => null,
  });

  const {
    getRootProps: getRootStickerProps,
    getInputProps: getInputStickerProps,
  } = useDropzone({
    onDrop,
    multiple: true,
    onDragEnter: () => null,
    onDragOver: () => null,
    onDragLeave: () => null,
  });
  return (
    <div className=" bg-cover bg-fixed bg-background font-kameron pb-10">
      <div className="h-[40vh] w-full  absolute bg-gradient-to-b from-myYellow"></div>
      <Header page={page}></Header>
      <div className="flex h-[100vh] mt-20">
        <Formik
          initialValues={{
            name: "",
            labelUrl: "",
            stickers: [] as string[],
            tags: [],
            userId: userId,
          }}
          onSubmit={(value) => {
            imageupload.startUpload([image]).then(async (res) => {
              const imageUrl = res?.[0].url as string;
              value.labelUrl = imageUrl;
              for (const sticker of stickers) {
                await imageupload.startUpload([sticker]).then((res) => {
                  value.stickers = [...value.stickers, res?.[0].url as string];
                });
              }

              value.userId && createStickerPack(value as any);
            });
          }}
        >
          <Form className="flex flex-col items-center w-1/2 p-3 z-30">
            <label htmlFor="name">Sticker pack name:</label>
            <Field
              type="text"
              className="m-2 rounded-lg block"
              name="name"
            ></Field>
            <div className="edit__upload-area relative m-4 w-1/2">
              <div
                className="absolute inset-0 flex flex-col justify-center items-center"
                {...getRootProps()}
              >
                <input ref={inputRef} {...getInputProps()} name="labelUrl" />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <>
                    <img
                      src="/images/iconEMark.png"
                      className="w-[15px] h-[40px] self-center"
                      alt="exclamation mark icon"
                    ></img>
                    <p className="my-1">Drop your pictures here or</p>
                    <button
                      type="button"
                      className="bg-myYellow rounded-md text-sm py-0.5 max-w-min whitespace-nowrap p-2 "
                    >
                      Browse folders
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="edit__upload-area relative m-4 w-1/2">
              <div
                className="absolute inset-0 flex flex-col justify-center items-center"
                {...getRootStickerProps()}
              >
                <input
                  ref={inputRef}
                  {...getInputStickerProps()}
                  name="stickers"
                  multiple
                />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <>
                    <img
                      src="/images/iconEMark.png"
                      className="w-[15px] h-[40px] self-center"
                      alt="exclamation mark icon"
                    ></img>
                    <p className="my-1">Drop your pictures here or</p>
                    <button
                      type="button"
                      className="bg-myYellow rounded-md text-sm py-0.5 max-w-min whitespace-nowrap  p-2 "
                    >
                      Browse folders
                    </button>
                  </>
                )}
              </div>
            </div>

            <label htmlFor="tags">Sticker pack tags:</label>
            <Field
              type="text"
              className="m-2 rounded-lg block"
              name="tags"
            ></Field>
            <button
              type="submit"
              className="rounded-full bg-myYellow m-4 px-2 py-1"
            >
              Publish pack
            </button>
          </Form>
        </Formik>

        <div className="w-1/2 p-4">
          <p className="text-lg">Previews:</p>
          {imagePreview ? (
            <img src={imagePreview} className="w-1/2 m-3"></img>
          ) : (
            <p>No pictures chosen for preview yet</p>
          )}
          <div className="flex flex-wrap items-start">
            {stickersPreview ? (
              stickersPreview.map((sticker: string) => (
                <img src={sticker} key={sticker} className="w-[55px] m-3" />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Create;
