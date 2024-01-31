import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import {
  MyHomePage,
  Login,
  Register,
  MyAccount,
  NotFound,
  CategoryPage,
  NewBlog,
  BlogsPage,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./ScrollToTop";
import { useSelector, useDispatch } from "react-redux";
import SingleBlog from "./components/SingleBlog";
import { logout } from "./features/auth/authSlice";
import { useEffect } from "react";

function App() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const userToken = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const parseJwt = (token) => {
      try {
        return JSON.parse(atob(token.split(".")[1]));
      } catch (e) {
        return null;
      }
    };

    if (userToken) {
      const decodedJwt = parseJwt(userToken?.token);
      const expiryDate = new Date(decodedJwt?.exp * 1000);

      if (expiryDate < Date.now()) {
        dispatch(logout());
      }
    }
  }, [dispatch, userToken]);

  return (
    <Router>
      <ScrollToTop>
        <Sidebar>
          <Routes>
            <Route path="/" element={<MyHomePage />} />
            <Route path="/new-category" element={<CategoryPage />} />
            <Route path="/new-blog" element={<NewBlog />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:name/:id" element={<SingleBlog />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/" /> : <Register />}
            />
            <Route
              path="/my-account"
              element={user ? <MyAccount /> : <Navigate to="/" />}
            />
            <Route path="*" element={<NotFound />} status={404} />
          </Routes>
          <ToastContainer />
        </Sidebar>
      </ScrollToTop>
    </Router>
  );
}

export default App;
