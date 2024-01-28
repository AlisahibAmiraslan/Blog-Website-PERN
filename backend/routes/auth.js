const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controller/userController");
const validInfo = require("../middleware/validInfo");
const authhorization = require("../middleware/authhorization");

router.post("/register", validInfo, registerUser);
router.post("/login", validInfo, loginUser);
router.get("/getuser", authhorization, getUser);
// getting all user but for security we can use post instead get method
router.post("/allusers", getAllUsers);
router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
