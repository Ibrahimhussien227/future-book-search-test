import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ links, setPage }) => {
  const getClassName = (active) => {
    if (active) {
      return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary bg-blue-700 text-white cursor-pointer";
    }
    return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary cursor-pointer";
  };

  return (
    links.length > 1 && (
      <div className="mb-4">
        <div className="flex flex-wrap mt-8">
          {links.map((link, key) =>
            link.url === null ? (
              <div
                key={key}
                className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
              >
                {link.label}
              </div>
            ) : (
              <div
                key={key}
                className={getClassName(link.active)}
                onClick={() => {
                  if (link.label === "Next") {
                    setPage((prev) => prev + 1);
                  } else if (link.label === "Previous") {
                    setPage((prev) => prev - 1);
                  } else {
                    setPage(link.label);
                  }
                }}
              >
                {link.label}
              </div>
            )
          )}
        </div>
      </div>
    )
  );
};

export default Pagination;
