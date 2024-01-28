import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const CategoryComponent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const [post, setPost] = useState({
    category: "",
  });
  const [showErrorMsg, setshowErrorMsg] = useState("");
  const [Loading, setLoading] = useState(false);

  const [updatedCategory, setUpdatedCategory] = useState({
    category_id: "",
    category: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [CatCategory, setCatCategory] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    setUpdatedCategory((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createCategory = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_HOST_CATEGORY_URL, post, {
        headers: { token },
      })
      .then((res) => {
        setLoading(true);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_HOST_CATEGORY_URL)
      .then((res) => {
        setCatCategory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateCategory = (id, catName) => {
    setUpdatedCategory((prev) => {
      return {
        ...prev,
        category_id: id,
        category: catName,
      };
    });
    handleShow();
  };

  const saveUpdatedCategory = () => {
    axios
      .put(
        `${process.env.REACT_APP_HOST_CATEGORY_URL}${updatedCategory.category_id}`,
        updatedCategory,
        {
          headers: { token },
        }
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

  const deleteCategory = (id) => {
    axios
      .delete(`${process.env.REACT_APP_HOST_CATEGORY_URL}${id}`, {
        headers: { token },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <section>
      <div className="form-page">
        <h3>Add Category</h3>
        <Form className="form" onSubmit={createCategory}>
          <Form.Group>
            <Form.Control
              onChange={handleChange}
              name="category"
              placeholder="category"
              style={{ marginBottom: "1rem", padding: "15px" }}
              value={post.category}
              required
            />
          </Form.Group>
          <button
            type="submit"
            className="w-full h-14 bg-[#7355f8] hover:bg-[#473597] transition-all duration-300 ease-in-out mt-3 rounded-lg text-white"
          >
            {!Loading ? (
              "Add"
            ) : (
              <div className="w-full flex justify-center">
                <div className="spinner"></div>
              </div>
            )}
          </button>
        </Form>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="category"
            name="category"
            value={updatedCategory.category ? updatedCategory.category : ""}
            style={{ marginBottom: "1rem", padding: "15px" }}
            onChange={handleChange}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="w-full h-14 bg-[#7355f8] hover:bg-[#473597] transition-all duration-300 ease-in-out mt-3 rounded-lg text-white"
            onClick={saveUpdatedCategory}
          >
            Update
          </button>
          {showErrorMsg && (
            <div className="mt-3 w-full text-red-500 text-center text-lg">
              {showErrorMsg}
            </div>
          )}
        </Modal.Footer>
      </Modal>
      <div className="header-content grid lg:grid-cols-2 grid-cols-1 gap-3">
        {CatCategory?.map((cat) => {
          return (
            <div key={cat.category_id} className="menu-item form bg-white">
              <div>
                <p>
                  Category: <span>{cat.category}</span>
                </p>
              </div>
              <div>
                <Button
                  variant="outline-info"
                  onClick={() => updateCategory(cat.category_id, cat.category)}
                >
                  <FaRegEdit />
                </Button>
                <Button
                  onClick={() => deleteCategory(cat.category_id)}
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

export default CategoryComponent;
