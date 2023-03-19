import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { categories } from "../constants";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const params = new URLSearchParams(search);

  const [category, setCategory] = useState(
    params.get("category") || "programming"
  );
  const [sortBy, setSortBy] = useState(params.get("sortby") || "relevance");
  const [searchTerm, setSearchTerm] = useState(params.get("q") || "js");

  const onChangeFilter = (value, type) => {
    switch (type) {
      case "search":
        setSearchTerm(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "sortBy":
        setSortBy(value);
        break;
      default:
        break;
    }
  };

  const categoriesOptions = (e) => {
    onChangeFilter(e.target.value, "category");
    navigate(
      `/search?q=${searchTerm}&category=${e.target.value}&sortby=${sortBy}`
    );
  };

  const sortingByOptions = (e) => {
    onChangeFilter(e.target.value, "sortBy");
    if (searchTerm)
      navigate(
        `/search?q=${searchTerm}&category=${category}&sortby=${e.target.value}`
      );
  };

  const searchNewsHandler = (e) => {
    onChangeFilter(e.target.value, "search");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}&category=${category}&sortby=${sortBy}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex items-center">
          <h1 className="font-bold text-xl text-gray-600">News</h1>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
          <Link
            to="/"
            className=" inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium border-indigo-500 text-gray-900"
          >
            Home
          </Link>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 sm:gap-x-8">
        <form onSubmit={onSubmit}>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Search Books
          </label>
          <input
            type="text"
            className="mt-3 block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Search books..."
            onChange={searchNewsHandler}
          />
        </form>

        <div>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by Categories
          </label>
          <div className="mt-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="categories"
                onChange={categoriesOptions}
              >
                {categories.map(({ name, value }) => (
                  <MenuItem key={name} value={value}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by Sort By
          </label>
          <div className="mt-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sorting By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortBy}
                label="sortBy"
                onChange={sortingByOptions}
              >
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="relevance">Relevance</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
