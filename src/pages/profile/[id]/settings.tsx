import Header from "components/Header/header";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";
import { useUpdateUser } from "services/updateUser";
import { useDeleteUser } from "services/deleteUser";
import { useGetUserById } from "services/getUserById";

const user = {
  imageUrl: "/images/kermit.png",
  description: "Lorem Ipsum bitches RISE UP",
};

const Settings = () => {
  const page = "My profile";
  const router = useRouter();
  const { id } = router.query;
  const { data: user, isLoading } = useGetUserById(Number(id));
  const { mutateAsync: updateUser } = useUpdateUser();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const [profile, setPicture] = useState("");
  React.useEffect(() => {
    if (user) setPicture(user.profilePicUrl);
  }, []);

  const handleProfileChange = (e: any) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setPicture(reader.result as any);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className=" bg-cover bg-fixed bg-background font-kameron h-[100vh]">
      <div className="h-[18vh] md:h-[20vh] lg:h-[40vh] w-full  absolute bg-gradient-to-b from-myYellow"></div>
      <Header page={page}></Header>
      <div className="flex justify-center align-center pt-10 from-myYellow">
        <div className="w-1/2 bg-yellow-100 ">
          <div className="bg-yellow-200 h-5"></div>
          <div className="">
            <div className="flex flex-col items-center p-3">
              {user ? (
                <>
                  {" "}
                  <Formik
                    enableReinitialize
                    initialValues={{
                      profilePicUrl: user.profilePicUrl,
                      description: user.description,
                      id: Number(id),
                    }}
                    onSubmit={async (value) => {
                      await updateUser(value);
                    }}
                  >
                    <Form className="flex flex-col items-center">
                      <label htmlFor="profile">
                        <img
                          className="rounded-full w-[60px] h-[60px] m-4"
                          src={user.profilePicUrl}
                        ></img>
                      </label>
                      <input
                        type="file"
                        id="profile"
                        name="profile"
                        className="text-center pl-[4.5rem]"
                        onChange={handleProfileChange}
                      />
                      <Field
                        as="textarea"
                        className="m-4 rounded-lg p-2"
                        name="description"
                      ></Field>
                      <button type="submit">Save profile</button>
                    </Form>
                  </Formik>
                  <button
                    className="rounded-full bg-red-500 text-white m-4 px-2 py-1"
                    onClick={() => deleteUser(Number(id))}
                  >
                    Delete profile
                  </button>
                </>
              ) : (
                <p>...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
