import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaHandPointLeft } from "react-icons/fa";
import Comments from "../Comments";

const SingleBlog = () => {
  const { id } = useParams();

  const [getBlog, setgetBlog] = useState("");

  useEffect(() => {
    // blogs
    axios
      .get(process.env.REACT_APP_HOST_BLOGS_URL + id)
      .then((res) => {
        setgetBlog(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="w-full px-6 my-10">
      <Link
        to="/blogs"
        className="underline underline-offset-4 text-black flex w-32 items-center"
      >
        <FaHandPointLeft className="text-red-400 mr-2" /> Get Back
      </Link>
      <div>
        <h1 className="text-center pb-3 pt-5">{getBlog.title}</h1>
        <p className="text-[#333333]">{getBlog.content}</p>
        <div className="pt-3 border-t flex lg:justify-between justify-start lg:flex-row flex-col">
          <div className="text-sm text-[#333333]">
            <span>Posted on:</span>
            <span className="text-[#fca5a5] block">
              {new Date(getBlog.created_at).toDateString()}
            </span>
          </div>
          <div>
            <span className="text-xs text-[#00d301]">
              <span className="text-[#333333]">Category:</span>{" "}
              {getBlog.category}
            </span>
          </div>
        </div>
      </div>
      <Comments id={id} />
    </div>
  );
};

export default SingleBlog;
