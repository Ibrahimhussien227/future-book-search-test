import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetBookDetailsQuery } from "../app/services/booksApi";
import Loader from "../components/Loader";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState();
  const { data, isFetching } = useGetBookDetailsQuery(bookId);

  useEffect(() => {
    console.log(data);
    if (data) {
      const { volumeInfo } = data;
      setBook(volumeInfo);
    }
  }, [data]);

  const placeholderImage =
    "https://via.placeholder.com/1280x720.png?text=No+preview+is+available";

  return (
    <div className="px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      {isFetching ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center gap-10">
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-2">
            {/* {books.map((book) => (
              <BookCard key={book.etag} book={book} />
            ))} */}
            <div>
              <img
                src={
                  book?.imageLinks?.thumbnail
                    ? book?.imageLinks?.smallThumbnail
                    : placeholderImage
                }
                width={250}
              />
            </div>
            <div>
              <div className="flex flex-col gap-1">
                {book?.categories.map((category) => (
                  <p className="text-sm text-gray-600">{category}</p>
                ))}
              </div>
              <h1 className="mt-10">{book?.title}</h1>
              <div className="flex gap-4 mt-1">
                {book?.authors.map((author) => (
                  <p className="text-gray-500 underline">{author}</p>
                ))}
              </div>
              <div className="mt-10 border">
                <p
                  className="p-6"
                  dangerouslySetInnerHTML={{ __html: book?.description }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
