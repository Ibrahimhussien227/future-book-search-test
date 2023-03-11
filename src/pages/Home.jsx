import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AsyncPaginate } from "react-select-async-paginate";
import Pagination from "@mui/material/Pagination";
import { BsCheckCircle } from "react-icons/bs";

import {
  useGetArticlesQuery,
  useLazyGetAuthorsQuery,
  useLazyGetSourcesQuery,
} from "../app/services/newsApi";
import ArticaleCard from "../components/ArticaleCard";
import { useStateContext } from "../contexts/ContextProvider";
import { customStyles } from "../constant/customStyles";
import Loader from "../components/Loader";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [sources, setSources] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalNews, setTotalNews] = useState(0);
  const [links, setLinks] = useState([]);

  const { user } = useStateContext();

  const authorIds = authors.map((item) => item.value);
  const sourceIds = sources.map((item) => item.value);

  const { data, isFetching } = useGetArticlesQuery({
    page,
    searchTerm,
    authorIds,
    sourceIds,
  });

  const [getAuthors] = useLazyGetAuthorsQuery();
  const [getSources] = useLazyGetSourcesQuery();

  useEffect(() => {
    if (data) {
      if (data.status) {
        setLinks(data.results.links);
        setTotalNews(data.results?.total);
        if (data.results.data?.length) {
          setArticles(data.results.data);
        }
      }
    }
  }, [data]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const authorLoadOptions = async (search, loadedOptions, { page }) => {
    const responseJSON = await getAuthors({ search, page });

    const options = [];
    responseJSON?.data?.results?.data?.map((resultItem) =>
      options.push({ value: resultItem.id, label: resultItem.author_name })
    );

    return {
      options,
      hasMore: !(
        responseJSON?.data?.results?.data?.length <
        responseJSON?.data?.results?.per_page
      ),
      additional: {
        page: page + 1,
      },
    };
  };

  const sourceLoadOptions = async (search, loadedOptions, { page }) => {
    const responseJSON = await getSources({ search, page });

    const options = [];
    responseJSON?.data?.results?.data?.map((resultItem) =>
      options.push({ value: resultItem.id, label: resultItem.source })
    );

    return {
      options,
      hasMore: !(
        responseJSON?.data?.results?.data?.length <
        responseJSON?.data?.results?.per_page
      ),
      additional: {
        page: page + 1,
      },
    };
  };

  const onChangeFilter = (value, type) => {
    setPage(1);
    setArticles([]);

    switch (type) {
      case "search":
        setSearchTerm(value);
        break;
      case "authors":
        setAuthors(value);
        break;
      case "sources":
        setSources(value);
        break;
      default:
        break;
    }
  };

  let searchDelay = null;
  const searchNewsHandler = (e) => {
    if (searchDelay) {
      clearTimeout(searchDelay);
    }

    searchDelay = setTimeout(() => {
      onChangeFilter(e.target.value, "search");
    }, 1000);
  };

  return (
    <div className="px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        News
      </h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 sm:gap-x-8">
        <div>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Search News
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Search news..."
            onChange={searchNewsHandler}
          />
        </div>

        <div>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by Authors
          </label>
          <div className="mt-1">
            <AsyncPaginate
              value={authors}
              loadOptions={authorLoadOptions}
              onChange={(selectedValue) => {
                onChangeFilter(selectedValue, "authors");
              }}
              additional={{
                page: 1,
              }}
              isMulti
              styles={customStyles}
              placeholder={<div>Select or type to search author</div>}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by Source
          </label>
          <div className="mt-1">
            <AsyncPaginate
              value={sources}
              loadOptions={sourceLoadOptions}
              onChange={(selectedValue) => {
                onChangeFilter(selectedValue, "sources");
              }}
              additional={{
                page: 1,
              }}
              isMulti
              styles={customStyles}
              placeholder={<div>Select or type to search source</div>}
            />
          </div>
        </div>
      </div>

      {isFetching ? (
        <Loader />
      ) : articles.length ? (
        <>
          <p className="mt-4 text-gray-500 text-sm">
            {`Total ${totalNews} news found in this search`}
          </p>
          <div className="flex flex-col items-center gap-10">
            <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
              {articles.map((article) => (
                <ArticaleCard key={article.id} article={article} />
              ))}
            </div>
            {/* <Pagination links={links} setPage={setPage} /> */}
            {/* -2 because the next and prev count as a page */}
            <Pagination
              count={links.length - 2}
              page={page}
              onChange={handleChange}
            />
          </div>
        </>
      ) : (
        <div className="text-center py-16 px-6 sm:py-24 lg:px-8">
          <BsCheckCircle
            className="mx-auto block h-16 w-16 text-center"
            aria-hidden="true"
          />

          <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-4">
            No articles available at this moment
          </p>

          <Link
            to="/"
            className="text-base font-medium text-indigo-700 hover:text-indigo-600"
          >
            Reload to see new articles <span aria-hidden="true"> &rarr;</span>
          </Link>

          {user && (
            <p className="mt-4 text-sm text-gray-500">
              You can also try by resetting your{" "}
              <Link to="preferences" className="text-indigo-700">
                preference
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
