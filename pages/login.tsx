import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { USER_SIGN_IN } from "../config/queries";
import InputErrorFormik from "../components/ui/InputErrorFormik";
import InputFormik from "../components/ui/InputFormik";
import InputButton from "../components/ui/InputButton";
import { showNotification, AlertType } from "../components/layout/Notification";
import Layout from "../components/layout/Layout";

const SignIn = () => {
  const router = useRouter();
  const [userSignIn] = useMutation(USER_SIGN_IN);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is not a valid email")
        .required("Email cannot be empty"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        const { data } = await userSignIn({
          variables: {
            input: { email, password },
          },
        });
        showNotification({ message: "...Loging", isLoading: true });

        // guardar token en local storage
        const { token } = data.userSignIn;
        localStorage.setItem("token", token);

        setTimeout(() => {
          router.push("/home");
        }, 2000);
      } catch (error: any) {
        const message = error.message.replace("GraphQL error: ", "");
        showNotification({
          message,
          type: AlertType.warn,
        });
      }
    },
  });

  return (
    <Layout>
      <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
        <h1 className="text-center text-2xl text-white font-light">Login</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <InputFormik
                id={"email"}
                title={"Email"}
                type={"email"}
                placeholder={"User email"}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <InputErrorFormik error={formik.errors.email} />
              )}

              <InputFormik
                id={"password"}
                title={"Password"}
                type={"password"}
                placeholder={"User password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <InputErrorFormik error={formik.errors.password} />
              )}

              <InputButton value={"Sign In"} />

              <Link href="/sign-up">
                <a className="flex text-gray-500 p-4 text-sm  justify-center">
                  Dont have an account? Sign up here
                </a>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
