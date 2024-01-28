import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "react-bootstrap";
import { MdOutlineMessage } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const Comments = ({ id }) => {
  const userToken = JSON.parse(localStorage.getItem("user"));
  const token = userToken?.token;

  const { user } = useSelector((state) => state.auth);

  const [getComments, setgetComments] = useState([]);
  const [post, setPost] = useState({
    user_id: userToken?.user_id,
    blog_id: id,
    comment: "",
  });
  const [Loading, setLoading] = useState(false);
  const [GetAllUsers, setGetAllUsers] = useState([]);

  useEffect(() => {
    // comments
    axios
      .get(process.env.REACT_APP_HOST_COMMENT_URL)
      .then((res) => {
        setgetComments(res.data);
      })
      .catch((err) => console.log(err));

    // getall users
    axios
      .post(process.env.REACT_APP_HOST_AUTH_URL + "allusers")
      .then((res) => {
        setGetAllUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const leaveComment = (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_HOST_COMMENT_URL, post, {
        headers: { token },
      })
      .then((res) => {
        setLoading(true);
        console.log(res);

        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const getCommentForBlog = getComments?.filter(
    (item) => item.blog_id === parseInt(id)
  );

  const deleteBlog = (id) => {
    axios
      .delete(`${process.env.REACT_APP_HOST_COMMENT_URL}${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/*  comment */}
      <div className="w-full lg:max-w-5xl mx-auto mt-20">
        <div className="w-full bg-[#f53145] rounded-xl">
          <p className="uppercase text-white p-3 flex items-center">
            <MdOutlineMessage className="mr-2" />
            Leave A Comment
          </p>
        </div>
        <div className="text-gray-600 pb-1 pt-3 border-b-2 font-bold">
          {getCommentForBlog.length} Comments
        </div>
        <form className="mt-10" onSubmit={leaveComment}>
          <textarea
            name="comment"
            className="h-32 w-full shadow-md focus:outline-none p-2"
            placeholder="Leave a Comment"
            onChange={handleChange}
            value={post.comment}
            required
          ></textarea>

          {user ? (
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="h-14 lg:w-52 w-full mt-6 block bg-[#7355f8] hover:bg-[#473597] transition-all duration-300 ease-in-out rounded-lg text-white"
              >
                {!Loading ? (
                  "Comment"
                ) : (
                  <div className="w-full flex justify-center">
                    <div className="spinner"></div>
                  </div>
                )}
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center mt-6 text-red-500">
              Please login for comment
            </div>
          )}
        </form>
        {/* comments from readers */}
        <div className="w-full mt-10">
          {getCommentForBlog &&
            getCommentForBlog.map((item, index) => {
              const Recorder = GetAllUsers?.filter(
                (userId) => userId?.user_id === item.user_id
              );

              return (
                <div
                  key={index}
                  className={
                    Recorder[0]?.userrole === "admin"
                      ? "bg-red-100 shadow-lg p-3 m-2 rounded-xl flex justify-between"
                      : "bg-white shadow-md p-3 m-2 rounded-xl flex justify-between"
                  }
                >
                  <div>
                    <div>
                      <span className="font-bold text-[#00d301]">
                        {item.user_id === Recorder[0]?.user_id &&
                          Recorder[0]?.username}
                      </span>
                      <span className="text-violet-600 italic uppercase text-xs">
                        {" "}
                        -- {Recorder[0]?.userrole}
                      </span>
                    </div>
                    <div>{item.comment}</div>
                    <div className="text-sm text-[#333333] font-bold mt-3">
                      <span>Posted on:</span>
                      <span className="text-[#fca5a5] block">
                        {new Date(item.created_at).toDateString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    {item.user_id === user?.user_id &&
                      user?.userrole !== "admin" && (
                        <Button
                          onClick={() => deleteBlog(item.comment_id)}
                          variant="outline-danger"
                          style={{ marginLeft: "10px" }}
                        >
                          <RiDeleteBin6Line />
                        </Button>
                      )}
                    {user?.userrole === "admin" && (
                      <Button
                        onClick={() => deleteBlog(item.comment_id)}
                        variant="outline-danger"
                        style={{ marginLeft: "10px" }}
                      >
                        <RiDeleteBin6Line />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Comments;
