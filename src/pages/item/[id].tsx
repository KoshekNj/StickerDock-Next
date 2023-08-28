import Header from "components/Header/header";
import StickerPack, { IPackProps } from "components/StickerPack/stickerPack";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useCreateComment } from "services/createComment";
import { useGetComments } from "services/getComments";
import { useGetPublishedItemById } from "services/getPublishedItemById";
import { useUpdatePublishedItem } from "services/updatePublishedItem";

const SingleItem = () => {
  const page = "SingleItem";
  const router = useRouter();
  let userId = 1;

  const { id } = router.query;
  let postId = Number(id);
  console.log(postId);
  const { data: image, isLoading } = useGetPublishedItemById(Number(id));
  const { data: comments } = useGetComments(Number(id));
  const { mutateAsync: createComment } = useCreateComment();
  const { mutateAsync: updatePublishedItem } = useUpdatePublishedItem();

  return (
    <div className=" bg-cover bg-fixed bg-background font-kameron h-[100vh] pb-10">
      <div className="h-[40vh] w-full  absolute bg-gradient-to-b from-myYellow"></div>
      <Header page={page}></Header>
      {isLoading ? (
        <p>...</p>
      ) : (
        <>
          <div className="flex justify-evenly px-28 mt-16 ">
            <img key={image?.id} src={image?.imageUrl}></img>

            <div className="w-1/3 p-3 z-30 relative">
              <div className="flex justify-start my-4">
                <button className="px-2  mr-3 py-0.5 rounded-lg text-sm bg-myYellow">
                  Add to your collection
                </button>
                <button
                  onClick={() =>
                    updatePublishedItem({ id: Number(id), value: 1 })
                  }
                  className="px-2 mr-3 py-0.5 rounded-lg text-sm bg-yellow-100"
                >
                  ☆ {image?.likes}
                </button>
              </div>
              <div>
                <div className="flex bg-yellow-100 px-3 py-2 items-center  mb-4">
                  <img
                    className="rounded-full w-[40px] h-[40px] mr-4"
                    src="/images/kermit.png"
                  ></img>
                  <p>Username</p>
                </div>
                <h1 className="text-lg">Comments</h1>
                <Formik
                  initialValues={{
                    text: "",
                    userId: userId,
                    id: postId,
                  }}
                  onSubmit={async (values) => {
                    values.id = postId;
                    console.log(values);

                    await createComment(values);
                  }}
                >
                  <div>
                    <Form>
                      <Field
                        as="textarea"
                        placeholder="Write a comment..."
                        name="text"
                        required
                      ></Field>
                      <button type="submit">Post it</button>
                    </Form>
                  </div>
                </Formik>

                {comments?.length !== 0 ? (
                  comments?.map((comment) => (
                    <div key={comment?.id}>
                      <p>{comment?.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-lg text-slate-500">No one commented yet</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleItem;
