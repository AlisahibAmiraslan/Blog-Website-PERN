import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const NewBlogComponent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const [post, setPost] = useState({
    title: "",
    content: "",
    category: "",
  });

  const [updatedBlog, setUpdatedBlog] = useState({
    blog_id: "",
    title: "",
    content: "",
    category: "",
  });
  const [Loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [GetCategory, setGetCategory] = useState([]);
  const [showErrorMsg, setshowErrorMsg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [GetBlogs, setGetBlogs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    setUpdatedBlog((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createBlog = (e) => {
    e.preventDefault();

    axios
      .post(process.env.REACT_APP_HOST_BLOGS_URL, post, {
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

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_HOST_BLOGS_URL)
      .then((res) => {
        setGetBlogs(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(process.env.REACT_APP_HOST_CATEGORY_URL)
      .then((res) => {
        setGetCategory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateBlog = (blog_id, title, content, category) => {
    setUpdatedBlog((prev) => {
      return {
        ...prev,
        blog_id: blog_id,
        title: title,
        content: content,
        category: category,
      };
    });
    handleShow();
  };

  const saveUpdatedBlog = () => {
    axios
      .put(
        `${process.env.REACT_APP_HOST_BLOGS_URL}${updatedBlog.blog_id}`,
        updatedBlog
      )
      .then((res) => {
        console.log(res);
        if (res?.response?.status === 200) {
          handleClose();
        }
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setshowErrorMsg(err?.response?.data);
      });
  };

  const deleteBlog = (id) => {
    axios
      .delete(`${process.env.REACT_APP_HOST_BLOGS_URL}${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));

    // delete blog

    axios
      .delete(`${process.env.REACT_APP_HOST_COMMENT_URL}${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="py-10">
      <div className="blog-form flex justify-center flex-col items-center">
        <h3 className="mb-10">Add New Blog</h3>
        <form
          className="w-full bg-white lg:py-10 lg:px-10 px-3 py-5"
          onSubmit={createBlog}
        >
          <input
            type="text"
            required
            name="title"
            placeholder="title"
            onChange={handleChange}
            value={post.title}
            className="w-full block p-3 rounded-lg border border-black"
          />
          <textarea
            name="content"
            placeholder="content"
            onChange={handleChange}
            value={post.content}
            required
            className="block w-full p-3 my-3 h-72 rounded-lg border border-black"
          ></textarea>
          <select
            onChange={handleChange}
            name="category"
            className="border p-2"
            required
          >
            <option value="">--Please Choose Category--</option>
            {GetCategory &&
              GetCategory.map((item, index) => {
                return (
                  <option key={index} value={item.category}>
                    {item.category}
                  </option>
                );
              })}
          </select>

          <button
            type="submit"
            className="h-14 lg:w-52 w-full mt-5 block bg-[#7355f8] hover:bg-[#473597] transition-all duration-300 ease-in-out rounded-lg text-white"
          >
            {!Loading ? (
              "Add Blog"
            ) : (
              <div className="w-full flex justify-center">
                <div className="spinner"></div>
              </div>
            )}
          </button>
        </form>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            required
            name="title"
            placeholder="title"
            onChange={handleChange}
            value={updatedBlog.title ? updatedBlog.title : ""}
            className="w-full block p-3 rounded-lg border border-black"
          />
          <textarea
            name="content"
            placeholder="content"
            onChange={handleChange}
            value={updatedBlog.content ? updatedBlog.content : ""}
            required
            className="block w-full p-3 my-3 h-48 rounded-lg border border-black"
          ></textarea>

          <select
            onChange={handleChange}
            name="category"
            className="border p-2"
            required
          >
            <option value="">--Please Choose Category--</option>
            {GetCategory &&
              GetCategory.map((item, index) => {
                return (
                  <option key={index} value={item.category}>
                    {item.category}
                  </option>
                );
              })}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="w-full h-14 bg-[#7355f8] hover:bg-[#473597] transition-all duration-300 ease-in-out mt-3 rounded-lg text-white"
            onClick={saveUpdatedBlog}
          >
            Update Blog
          </button>
          {showErrorMsg && (
            <div className="mt-3 w-full text-red-500 text-center text-lg">
              {showErrorMsg}
            </div>
          )}
        </Modal.Footer>
      </Modal>
      <div className="header-content grid lg:grid-cols-2 grid-cols-1 gap-3">
        {GetBlogs &&
          GetBlogs?.map((blog) => {
            return (
              <div key={blog.blog_id} className="menu-item form bg-white">
                <div>
                  <p>
                    Blog Title: <span>{blog.title}</span>
                  </p>
                  <p>
                    Blog Content:
                    <span>{blog.content?.substring(0, 250)}...</span>
                  </p>
                  <p>
                    Category:
                    <span className="text-red-500 ml-2">{blog.category}</span>
                  </p>
                </div>
                <div>
                  <Button
                    variant="outline-info"
                    onClick={() =>
                      updateBlog(
                        blog.blog_id,
                        blog.title,
                        blog.content,
                        blog.category
                      )
                    }
                  >
                    <FaRegEdit />
                  </Button>
                  <Button
                    onClick={() => deleteBlog(blog.blog_id)}
                    variant="outline-danger"
                    style={{ marginLeft: "10px" }}
                  >
                    <RiDeleteBin6Line />
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default NewBlogComponent;
