import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { useSignUpUser } from "services/signUpUser";
import { useRouter } from "next/router";

const SignUp = () => {
  const { mutateAsync: userSignUp } = useSignUpUser();
  const router = useRouter();
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
            username: "",
            password: "",
            password2: "",
          }}
          onSubmit={async (values) => {
            if (values.password !== values.password2)
              alert("Passwords do not match");
            else
              userSignUp({
                email: values.email,
                password: values.password,
                username: values.username,
              }).then((res) => router.push("/"));
          }}
        >
          <Form className="flex flex-col w-1/2 p-4 items-center">
            <Field
              type="text"
              placeholder="Enter your username"
              name="username"
              className="rounded-full border border-myYellow w-[250px] m-2 py-1 px-2"
            />
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
            <Field
              type="password"
              placeholder="Enter your password again"
              name="password2"
              className="rounded-full border border-myYellow w-[250px] m-2 py-1 px-2"
            />
            <button
              type="submit"
              className="m-2 px-3 bg-myYellow rounded-full py-1.5"
            >
              Sign Up
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
