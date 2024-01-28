const pool = require("../db/connect");

//create category
const createCategory = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).send("Please add all fields");
    }

    const categories = await pool.query(
      "INSERT INTO categories (category) VALUES($1) RETURNING *",
      [category]
    );

    res.status(200).json(categories.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

//get categories
const getAllCategories = async (req, res) => {
  try {
    const allCategories = await pool.query("SELECT * FROM categories");

    res.status(200).json(allCategories.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

//get single category
const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await pool.query(
      "SELECT * FROM categories WHERE category_id = $1",
      [id]
    );

    if (!category || category.rows.length == 0) {
      return res.status(404).json(`Not found any category with id: ${id}`);
    }

    res.status(200).json(category.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;

    if (!category) {
      return res.status(400).send("Please add all fields");
    }

    const updateSingleCategory = await pool.query(
      "UPDATE categories SET category = $1 WHERE category_id = $2 RETURNING *",
      [category, id]
    );

    if (updateSingleCategory.rows.length === 0) {
      return res.status(404).json(`Not found any category with id: ${id}`);
    }

    res.status(200).json(updateSingleCategory.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteSingleCategory = await pool.query(
      "DELETE FROM categories WHERE category_id = $1 RETURNING *",
      [id]
    );

    if (deleteSingleCategory.rows.length === 0) {
      return res.status(404).json(`Not found any category with id: ${id}`);
    }

    res.status(200).json(deleteSingleCategory.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
