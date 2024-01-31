/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const MyAccountComponent = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const token = userInfo?.token;

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [post, setPost] = useState({
    username: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [getUser, setGetUser] = useState();
  const [showErrorMsg, setshowErrorMsg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteClose = () => setshowDeleteModal(false);
  const handleDeleteShow = () => setshowDeleteModal(true);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_HOST_AUTH_URL + "getuser", {
        headers: { token },
      })
      .then((res) => setGetUser(res.data))
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          dispatch(logout());
        }
      });
  }, [user, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const saveUpdatedAccount = () => {
    const postData = {
      user_id: user.user_id,
      username: post.username,
      password: post.password,
    };

    axios
      .put(`${process.env.REACT_APP_HOST_AUTH_URL}${user.user_id}`, postData, {
        headers: { token },
      })
      .then((res) => {
        if (res.status === 201) {
          toast(
            "Successfull Updated...Logging out of the website. Please log in again",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
        setTimeout(() => {
          dispatch(logout());
          window.location.reload();
        }, 1000);
      })
      .catch((err) => setshowErrorMsg(err.response.data));
  };

  const DeleteMyAccount = (id) => {
    axios
      .delete(`${process.env.REACT_APP_HOST_AUTH_URL}${id}`)
      .then((res) => {
        if (res.status === 200) {
          toast("Successfull Deleted Account", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        setTimeout(() => {
          dispatch(logout());
          window.location.reload();
        }, 1000);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full">
      {getUser && (
        <div className="lg:w-1/3 w-full lg:bg-white lg:m-5 p-5">
          <div className="mb-2">
            <span className="mr-3">Username:</span>
            <b>{userInfo?.username}</b>
          </div>
          <div>
            <span className="mr-3">Email:</span>
            <b>{getUser?.user_email}</b>
          </div>
          <div className="mt-3 w-full flex justify-end">
            <Button variant="outline-info" onClick={() => handleShow()}>
              <FaRegEdit />
            </Button>
            {userInfo && userInfo?.userrole === "reader" ? (
              <Button
                variant="outline-danger"
                style={{ marginLeft: "10px" }}
                onClick={() => handleDeleteShow()}
              >
                <RiDeleteBin6Line />
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      {/* delete user */}
      <div>
        <Modal show={showDeleteModal} onHide={handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Your Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span className="text-red-600">
              Are You Sure Delete Your Account ?
            </span>
          </Modal.Body>
          <Modal.Footer>
            <div className="w-full flex gap-3 mt-6 justify-end">
              <div className="flex justify-center items-center">
                <Button
                  variant="outline-danger"
                  style={{
                    marginLeft: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  onClick={() => DeleteMyAccount(getUser?.user)}
                >
                  <span>Yes</span> <RiDeleteBin6Line />
                </Button>
              </div>
              <div className="flex justify-center items-center">
                <Button variant="secondary" onClick={handleDeleteClose}>
                  No, I don't
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
      {/* update user */}
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Change Your Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              className="p-3 w-full focus:outline-none border border-gray-400 rounded-md"
              placeholder="New Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              disabled
              name="email"
              autoComplete="off"
              className="p-3 my-3 w-full focus:outline-none border border-gray-400 rounded-md text-red-400 cursor-not-allowed"
              placeholder="Email"
              title="Cannot Update Email"
              value={getUser?.user_email}
            />
            <input
              type="text"
              name="password"
              autoComplete="off"
              className="p-3 w-full focus:outline-none border border-gray-400 rounded-md"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="w-full h-14 bg-[#7355f8] hover:bg-[#473597] transition-all duration-300 ease-in-out mt-3 rounded-lg text-white"
              onClick={saveUpdatedAccount}
            >
              Update
            </button>
            <div className="text-red-500 text-center w-full mt-4">
              {showErrorMsg && showErrorMsg}
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default MyAccountComponent;
