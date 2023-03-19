import React, { useState, useEffect } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { useLocation } from "react-router-dom";

import Loader from "../components/Loader";
import { useGetBooksQuery } from "../app/services/booksApi";
import BookCard from "../components/BookCard";

const Home = () => {
  const location = useLocation();
  const { search } = location;
  const params = new URLSearchParams(search);

  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);

  const { data, isFetching } = useGetBooksQuery({
    q: params.get("q") || "js",
    category: params.get("category") || "programming",
    sortby: params.get("sortby") || "relevance",
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      if (data.items) {
        setBooks(data.items);
        setTotalBooks(data.totalItems);
      }
    }
  }, [data]);

  return (
    <div className="px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      {isFetching ? (
        <Loader />
      ) : books.length ? (
        <>
          <p className="mt-4 text-gray-500 text-sm">
            {`Total ${totalBooks} news found in this search`}
          </p>
          <div className="flex flex-col items-center gap-10">
            <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
              {books.map((book) => (
                <BookCard key={book.etag} book={book} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-16 px-6 sm:py-24 lg:px-8">
          <BsCheckCircle
            className="mx-auto block h-16 w-16 text-center"
            aria-hidden="true"
          />

          <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-4">
            No books available at this moment
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
