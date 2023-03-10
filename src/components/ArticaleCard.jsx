import React from "react";

const placeholderImage =
  "https://via.placeholder.com/1280x720.png?text=No+preview+is+available";

const ArticaleCard = ({ article }) => (
  <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
    <div className="flex-shrink-0">
      <img
        className="h-48 w-full object-cover"
        src={article.url_to_image ? article.url_to_image : placeholderImage}
        alt=""
      />
    </div>
    <div className="flex flex-1 flex-col justify-between bg-white p-6">
      <div className="flex-1">
        <p className="text-sm font-medium">
          <span className="text-gray-500">{article.apiSource} | </span>
          {article.source?.id && (
            <a
              href={article.url}
              className="text-indigo-600 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {article.source.source}
            </a>
          )}
        </p>
        <a
          href={article.url}
          className="mt-2 block"
          target="_blank"
          rel="noreferrer"
        >
          <p className="text-xl font-semibold text-gray-900">{article.title}</p>
          <p className="mt-3 text-base text-gray-500">{article.description}</p>
        </a>
      </div>
      <div className="mt-6">
        <p className="text-sm font-medium text-gray-900">
          {article.raw_author}
        </p>
        <div className="flex space-x-1 text-sm text-gray-500">
          <time dateTime={article.published_at}>{article.published_at}</time>
        </div>
      </div>
    </div>
  </div>
);

export default ArticaleCard;
