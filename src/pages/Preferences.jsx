import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useGetPreferencesQuery,
  usePostPreferencesMutation,
} from "../app/services/newsApi";
import Loader from "../components/Loader";
import { useStateContext } from "../contexts/ContextProvider";

const Preferences = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useStateContext();
  const [authors, setAuthors] = useState([]);
  const [sources, setSources] = useState([]);
  const [preference, setPreference] = useState({});

  const { data, isFetching } = useGetPreferencesQuery();
  const [preferencePost] = usePostPreferencesMutation();

  useEffect(() => {
    if (data) {
      if (data.status) {
        setAuthors(data.results.authors);
        setSources(data.results.sources);
        setPreference(JSON.parse(data.results.preference));
      }
    }
  }, [data]);

  /**
   * Convert array number as string to number
   */
  if (Array.isArray(preference?.authors) && preference?.authors?.length) {
    preference.authors = preference.authors.map((val) => Number(val));
  } else {
    preference.authors = [];
  }

  if (Array.isArray(preference?.sources) && preference?.sources?.length) {
    preference.sources = preference.sources.map((val) => Number(val));
  } else {
    preference.sources = [];
  }

  const onSubmit = (submittedData) => {
    const savePreference = preferencePost(
      JSON.stringify(submittedData)
    ).unwrap();
    toast.promise(savePreference, {
      pending: `Saving...`,
      success: `Preferences has been saved`,
      error: `Something went wrong, please try again`,
    });
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <h2 className="mt-6 mb-8 text-center text-3xl font-bold tracking-tight text-gray-900">
            Preferences
          </h2>

          <hr />

          <form
            className="space-y-8 divide-y divide-gray-200"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-8 divide-y divide-gray-200">
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <div className="pt-8">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Authors
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        I would like to read news only from the authors listed
                        below.
                      </p>
                    </div>
                    {isFetching ? (
                      <Loader />
                    ) : (
                      <div className="mt-6">
                        <fieldset>
                          <div
                            className="text-base text-gray-500"
                            aria-hidden="true"
                          >
                            {`${authors.length} authors`}
                          </div>

                          <div className="mt-4 space-y-4">
                            {authors.map((author) => (
                              <div
                                key={author.author_slug}
                                className="relative flex items-start"
                              >
                                <div className="flex h-5 items-center">
                                  <input
                                    id={`author_check_${author.id}`}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 "
                                    value={author.id}
                                    {...register("authors")}
                                    defaultChecked={preference?.authors?.includes(
                                      author.id
                                    )}
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label
                                    htmlFor={`author_check_${author.id}`}
                                    className="font-medium text-gray-700"
                                  >
                                    {author.author_name}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="pt-8">
                    <div>
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Sources
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Show me news only from the sources listed below.
                      </p>
                    </div>

                    {isFetching ? (
                      <Loader />
                    ) : (
                      <div className="mt-6">
                        <fieldset>
                          <div
                            className="text-base text-gray-500"
                            aria-hidden="true"
                          >
                            {`${sources.length} sources`}
                          </div>
                          <div className="mt-4 space-y-4">
                            {sources.map((source) => (
                              <div
                                key={source.source_slug}
                                className="relative flex items-start"
                              >
                                <div className="flex h-5 items-center">
                                  <input
                                    id={`source_check_${source.id}`}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 "
                                    value={source.id}
                                    {...register("sources")}
                                    defaultChecked={preference?.sources?.includes(
                                      source.id
                                    )}
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label
                                    htmlFor={`source_check_${source.id}`}
                                    className="font-medium text-gray-700"
                                  >
                                    {source.source}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Preferences;
