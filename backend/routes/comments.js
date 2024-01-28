const express = require("express");
const router = express.Router();
const {
  createComment,
  getAllComments,
  getSingleComment,
  updateComment,
  deleteComment,
} = require("../controller/commentController");

router.route("/").post(createComment).get(getAllComments);
router
  .route("/:id")
  .get(getSingleComment)
  .put(updateComment)
  .delete(deleteComment);

module.exports = router;
