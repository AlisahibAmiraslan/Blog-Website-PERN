const pool = require("../db/connect");

// create comments
const createComment = async (req, res) => {
  try {
    const { user_id, blog_id, comment } = req.body;

    if (!user_id || !blog_id || !comment) {
      return res.status(400).send("Please add all fields");
    }

    const comments = await pool.query(
      "INSERT INTO comments (user_id, blog_id, comment) VALUES($1, $2, $3) RETURNING *",
      [user_id, blog_id, comment]
    );

    res.status(200).json(comments.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

//get all comments
const getAllComments = async (req, res) => {
  try {
    const allComments = await pool.query("SELECT * FROM comments");

    res.status(200).json(allComments.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

//get single comment
const getSingleComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await pool.query(
      "SELECT * FROM comments WHERE comment_id = $1",
      [id]
    );

    if (!comment || comment.rows.length == 0) {
      return res.status(404).json(`Not found any comment with id: ${id}`);
    }

    res.status(200).json(comment.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

//update comment
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send("Please add all fields");
    }

    const updateSingleComment = await pool.query(
      "UPDATE comments SET comment = $1 WHERE comment_id = $2 RETURNING *",
      [comment, id]
    );

    if (updateSingleComment.rows.length === 0) {
      return res.status(404).json(`Not found any comment with id: ${id}`);
    }

    res.status(200).json(updateSingleComment.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

//delete comment
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteSingleComment = await pool.query(
      "DELETE FROM comments WHERE comment_id = $1 RETURNING *",
      [id]
    );

    if (deleteSingleComment.rows.length === 0) {
      return res.status(404).json(`Not found any comment with id: ${id}`);
    }

    res.status(200).json(deleteSingleComment.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createComment,
  getAllComments,
  getSingleComment,
  updateComment,
  deleteComment,
};
