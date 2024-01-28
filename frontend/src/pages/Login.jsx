import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Logo from "../assets/Images/logo.png";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast(message, {
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

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <section className="w-full h-screen bg-[#f0f4f8]">
      <div className="form-page items-center justify-center">
        <form onSubmit={onSubmit} className="form">
          <div className="border-b pb-3 mb-10 w-full flex justify-center items-center">
            <img src={Logo} alt="logo" width={200} height={200} />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="p-3 rounded-md w-full border bg-[#f0f4f8] focus:outline-none"
              autoComplete="off"
              id="email"
              name="email"
              value={email}
              placeholder="Mail"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="p-3 rounded-md my-4 w-full border bg-[#f0f4f8] focus:outline-none"
              autoComplete="off"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="w-full h-14 bg-[#7355f8] hover:opacity-80 transition-opacity duration-300 text-white shadow-xl rounded-md text-xl"
            >
              {isLoading ? (
                <div className="w-full flex justify-center submit-button">
                  <div className="spinner"></div>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="mt-5 w-full">
            <Link
              className="text-[#333333] underline underline-offset-4"
              to="/register"
            >
              Don't have an account?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
