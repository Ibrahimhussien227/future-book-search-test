import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../app/services/newsApi";
import { useStateContext } from "../contexts/ContextProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const [errorsServer, setErrorsServer] = useState(null);
  const navigate = useNavigate();
  const { setUser, user } = useStateContext();
  const [login] = useLoginMutation();

  const onSubmit = (submittedData) => {
    const payload = {
      email: submittedData.email,
      password: submittedData.password,
    };

    login(payload)
      .unwrap()
      .then((res) => {
        setUser(res.user);
        navigate("/");
      })
      .catch((error) => {
        const { data } = error;
        console.log(error);
        if (error && error.status === 422) {
          if (data.errors && data.message) {
            console.log(data.message);
            setErrorsServer({ email: [data.message] });
          } else {
            console.log(data.errors);
            setErrorsServer({ login: [data.errors] });
          }
        }
      });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-xl sm:rounded-2xl sm:px-10">
          {errorsServer?.login && (
            <p className="text-red-500 mb-5 w-fit">{errorsServer?.login}</p>
          )}
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="text"
                className="mt-1 1block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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

              {errors?.password?.message && (
                <p className="text-amber-500 text-xs mt-2 w-fit">
                  {errors?.password?.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  {...register("rememberme")}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
