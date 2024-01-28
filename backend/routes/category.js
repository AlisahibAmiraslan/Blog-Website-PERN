const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");

router.route("/").post(createCategory).get(getAllCategories);
router
  .route("/:id")
  .get(getSingleCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
