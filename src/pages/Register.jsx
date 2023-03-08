import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import { useSignupMutation } from "../app/services/newsApi";
import { useStateContext } from "../contexts/ContextProvider";

const Register = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const [errorsServer, setErrorsServer] = useState(null);
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const { setUser, user } = useStateContext();

  const onSubmit = (submitData) => {
    const payload = {
      name: submitData.name,
      email: submitData.email,
      password: submitData.password,
      password_confirmation: submitData.confirmPassword,
    };

    signup(payload)
      .unwrap()
      .then((res) => {
        setUser(res.user);
        navigate("/");
      })
      .catch((error) => {
        const { data } = error;
        if (error.status === 422) {
          setErrorsServer(data.errors);
        }
      });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Create your account
      </h2>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-xl sm:rounded-2xl sm:px-10">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("name", {
                  required: "Name is required",
                })}
              />

              {errors?.name?.message ? (
                <p className="text-amber-500 text-xs mt-2 w-fit">
                  {errors?.name?.message}
                </p>
              ) : errorsServer?.name ? (
                <p className="text-amber-500 text-xs mt-2 w-fit">
                  {errorsServer?.name}
                </p>
              ) : (
                ""
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="text"
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                })}
              />

              {errors?.email?.message ? (
                <p className="text-amber-500 text-xs mt-2 w-fit">
                  {errors?.email?.message}
                </p>
              ) : errorsServer?.email ? (
                <p className="text-amber-500 text-xs mt-2 w-fit">
                  {errorsServer?.email}
                </p>
              ) : (
                ""
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              {errors?.password?.message ? (
                <p className="text-amber-500 text-xs mt-2 w-fit">
                  {errors?.password?.message}
                </p>
              ) : errorsServer?.password ? (
                <p className="text-amber-500 text-xs mt-2 w-fit">
                  {errorsServer?.password}
                </p>
              ) : (
                ""
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
              />

              {errors?.confirmPassword?.message && (
                <p className="text-amber-500 text-xs mt-2 w-fit">
                  {errors?.confirmPassword?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
