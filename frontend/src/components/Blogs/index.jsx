import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import slugify from "slugify";

const BlogsComponent = () => {
  const [GetBlogs, setGetBlogs] = useState([]);
  const [CatCategory, setCatCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // blogs
    axios
      .get(process.env.REACT_APP_HOST_BLOGS_URL)
      .then((res) => {
        setGetBlogs(res.data);
      })
      .catch((err) => console.log(err));
    // category
    axios
      .get(process.env.REACT_APP_HOST_CATEGORY_URL)
      .then((res) => {
        setCatCategory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const categories = Array.from(
    new Set(CatCategory?.map((res) => res.category))
  );

  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
  }));

  const filterBlogs = selectedCategory
    ? GetBlogs?.filter((cat) => cat.category === selectedCategory.value)
    : GetBlogs;

  return (
    <div className="w-full lg:p-10 p-6">
      <h1 className="underline underline-offset-8 text-[#f53145] text-center">
        - The Blog -
      </h1>

      <div className="w-full lg:p-10">
        <div className="w-full flex mt-10 lg:items-center lg:flex-row flex-col">
          <div className="lg:w-[300px] w-full">
            <Select
              options={categoryOptions}
              isClearable
              placeholder="Select Category"
              onChange={(selectOption) => setSelectedCategory(selectOption)}
              value={selectedCategory}
            />
          </div>
          <div className="italic underline underline-offset-8 text-xl font-bold text-[#7355f8] lg:pl-5 lg:pt-0 pt-6">
            {filterBlogs && filterBlogs.length} Blogs
          </div>
        </div>
        {filterBlogs &&
          filterBlogs.map((item, index) => {
            return (
              <div key={index} className="py-10 border-b">
                <div className="flex justify-between lg:items-center lg:flex-row flex-col pb-6">
                  <h3 className="lg:text-5xl text-3xl">
                    <Link
                      to={
                        "/blogs/" +
                        slugify(item.title, { lower: true }) +
                        "/" +
                        item.blog_id
                      }
                      className="text-black no-underline"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <div className="text-sm text-[#333333]">
                    <span>Posted on:</span>
                    <span className="text-[#fca5a5] block">
                      {new Date(item.created_at).toDateString()}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[#605f5f]">
                    {item.content.slice(0, 355)}...
                  </p>
                </div>
                <div>
                  <span className="text-xs text-[#00d301]">
                    <span className="text-[#333333]">Category:</span>{" "}
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BlogsComponent;
