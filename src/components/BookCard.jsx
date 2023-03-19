import React from "react";
import { useNavigate } from "react-router-dom";

const placeholderImage =
  "https://via.placeholder.com/1280x720.png?text=No+preview+is+available";

const BookCard = ({ book: { volumeInfo, id } }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col overflow-hidden rounded-lg shadow-lg cursor-pointer"
      onClick={() => {
        navigate(`/details/${id}`);
      }}
    >
      <div className="flex-shrink-0">
        <img
          className="h-48 w-full object-cover"
          src={
            volumeInfo?.imageLinks?.thumbnail
              ? volumeInfo?.imageLinks?.smallThumbnail
              : placeholderImage
          }
          alt=""
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="mt-3 text-base text-gray-500">
            {volumeInfo.categories}
          </p>
          <p className="text-xl font-semibold text-gray-900">
            {volumeInfo.title}
          </p>
        </div>
        <div className="mt-6">
          {volumeInfo?.authors?.map((author, i) => (
            <p key={i} className="text-sm font-medium text-gray-900">
              {author}
            </p>
          ))}
          <div className="flex space-x-1 text-sm text-gray-500">
            <time dateTime={volumeInfo.publishedDate}>
              {volumeInfo.publishedDate}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
