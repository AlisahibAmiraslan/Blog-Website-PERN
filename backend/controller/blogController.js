const pool = require("../db/connect");

// create blogs
const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      return res.status(400).send("Please add all fields");
    }

    const blog = await pool.query(
      "INSERT INTO blogs (title, content, category) VALUES($1, $2, $3) RETURNING *",
      [title, content, category]
    );
    res.status(200).json(blog.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await pool.query("SELECT * FROM blogs");

    res.status(200).json(allBlogs.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// get single blog
const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await pool.query("SELECT * FROM blogs WHERE blog_id = $1", [
      id,
    ]);

    if (!blog || blog.rows.length == 0) {
      return res.status(404).json(`Not found any blog with id: ${id}`);
    }

    res.status(200).json(blog.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// update blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      return res.status(400).send("Please add all fields");
    }

    const updateSingleBlog = await pool.query(
      "UPDATE blogs SET title = $1, content = $2, category = $3 WHERE blog_id = $4 RETURNING *",
      [title, content, category, id]
    );

    if (updateSingleBlog.rows.length === 0) {
      return res.status(404).json(`Not found any blog with id: ${id}`);
    }

    res.status(200).json(updateSingleBlog.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

//delete blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteSingleBlog = await pool.query(
      "DELETE FROM blogs WHERE blog_id = $1 RETURNING *",
      [id]
    );

    const deleteCommentsOfBlog = await pool.query(
      "DELETE FROM comments WHERE blog_id = $1 RETURNING *",
      [id]
    );

    if (deleteSingleBlog.rows.length === 0) {
      return res.status(404).json(`Not found any blog with id: ${id}`);
    }
    const deletedBlogAndComments = [
      deleteSingleBlog.rows[0],
      deleteCommentsOfBlog.rows,
    ];

    res.status(200).json(deletedBlogAndComments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
