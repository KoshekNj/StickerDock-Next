import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { useLogInUser } from "services/logInUser";

const LogIn = () => {
  const { mutateAsync: userLogIn } = useLogInUser();
  return (
    <div className=" bg-cover bg-fixed bg-background font-kameron h-[100vh]">
      <div className="h-[18vh] md:h-[20vh] lg:h-[40vh] w-full  absolute bg-gradient-to-b from-myYellow"></div>

      <div className="flex justify-center align-center pt-10 from-myYellow"></div>
      <div className="relative flex flex-col items-center mt-10">
        <div className="flex justify-center align-center mb-10">
          <img
            className="w-[240px] h-[52px] md:w-[270px] md:h-[61px]"
            src={"/images/StickerTitle.png"}
            alt="title"
          ></img>
          <h1 className="text-stone-700 text-2xl leading-[60px] ml-7">DOCK</h1>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            userLogIn(values).then((res) => console.log(res));
          }}
        >
          <Form className="flex flex-col w-1/2 p-4 items-center">
            <Field
              type="text"
              placeholder="Enter your email"
              name="email"
              className="rounded-full border border-myYellow w-[250px] m-2 py-1 px-2"
            />
            <Field
              type="password"
              placeholder="Enter your password"
              name="password"
              className="rounded-full border border-myYellow w-[250px] m-2 py-1 px-2"
            />
            <button
              type="submit"
              className="m-2 px-3 bg-myYellow rounded-full py-1.5"
            >
              Log In
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LogIn;
