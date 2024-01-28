import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import slugify from "slugify";

const MyHome = () => {
  const [GetBlogs, setGetBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_HOST_BLOGS_URL)
      .then((res) => {
        setGetBlogs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full">
      <h1 className="mt-10 pb-3 border-b text-center">My Latest Blogs</h1>
      <div className="px-6">
        {GetBlogs &&
          GetBlogs.map((item, index) => {
            return (
              <div key={index} className="pb-6 border-b">
                <span className="text-[#00d301] uppercase text-sm">
                  {item.category}
                </span>
                <h2>
                  <Link
                    className="font-bold no-underline text-black"
                    to={"/blogs/" + slugify(item.title) + "/" + item.blog_id}
                  >
                    {item.title}
                  </Link>
                </h2>
                <p className="text-[#333333] text-xs">
                  Created:
                  <span className="text-red-300 pl-2">
                    {new Date(item.created_at).toDateString()}
                  </span>
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyHome;
