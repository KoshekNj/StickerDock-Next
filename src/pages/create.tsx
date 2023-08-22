import Header from "components/Header/header";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDropzone } from "react-dropzone";

const Create = () => {
  const page = "My profile";
  const [image, setImage] = React.useState("");
  const [stickers, setStickers]: any = React.useState([]);

  const onDrop = React.useCallback((acceptedFiles: any) => {
    if (acceptedFiles.length === 1) {
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = function () {
        setImage(reader.result as string);
      };
    } else {
      for (let i = 0; i < acceptedFiles.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[i]);
        reader.onload = function () {
          setStickers((stickers: any) => [...stickers, reader.result]);
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
            labelUrl: "",
            stickers: [],
          }}
          onSubmit={(value) => {
            console.log(value);
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
                    <button className="bg-myYellow rounded-md text-sm py-0.5 max-w-min whitespace-nowrap p-2 ">
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
                    <button className="bg-myYellow rounded-md text-sm py-0.5 max-w-min whitespace-nowrap  p-2 ">
                      Browse folders
                    </button>
                  </>
                )}
              </div>
            </div>

            <label htmlFor="tags">Sticker pack name:</label>
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
          {image ? (
            <img src={image} className="w-1/2 m-3"></img>
          ) : (
            <p>No pictures chosen for preview yet</p>
          )}
          <div className="flex flex-wrap">
            {stickers ? (
              stickers.map((sticker: string) => (
                <img src={sticker} key={sticker} className="w-[45px] m-3" />
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
