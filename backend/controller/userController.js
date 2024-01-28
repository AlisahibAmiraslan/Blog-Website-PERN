const pool = require("../db/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register User
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userrole = "reader";

    if (!username || !email || !password) {
      res.status(400).send("Please add all fields");
    }

    // check if user exist
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password, userrole) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, hashedPassword, userrole]
    );

    // generate register jwt
    const token = generateToken(
      newUser.rows[0].user_id,
      newUser.rows[0].username,
      newUser.rows[0].email
    );

    res.status(201).json({
      user_id: newUser.rows[0].user_id,
      username: newUser.rows[0].username,
      email: newUser.rows[0].email,
      userrole: newUser.rows[0].userrole,
      token: token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

//update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Please add all fields");
    }

    // compare valid password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updateSingleUser = await pool.query(
      "UPDATE users SET username = $1, password = $2 WHERE user_id = $3 RETURNING *",
      [username, hashedPassword, id]
    );

    if (updateSingleUser.rows.length === 0) {
      return res.status(404).json(`Not found any user with id: ${id}`);
    }

    res.status(201).json(updateSingleUser.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteSingleUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [id]
    );

    const deleteCommentsOfUsers = await pool.query(
      "DELETE FROM comments WHERE user_id = $1 RETURNING *",
      [id]
    );

    if (deleteSingleUser.rows.length === 0) {
      return res.status(404).json(`Not found any user with id: ${id}`);
    }

    const deletedUserAndComments = [
      deleteSingleUser.rows[0],
      deleteCommentsOfUsers.rows,
    ];

    res.status(200).json(deletedUserAndComments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //   check user email
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }

    //   email validate
    if (!user) {
      return res.status(401).json("Email is incorrect");
    }

    // compare valid password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    // password validate
    if (!validPassword) {
      return res.status(401).json("Password is incorrect");
    }

    // get token
    const token = generateToken(
      user.rows[0].user_id,
      user.rows[0].username,
      user.rows[0].email
    );

    res.status(201).json({
      user_id: user.rows[0].user_id,
      username: user.rows[0].username,
      userrole: user.rows[0].userrole,
      token: token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// get user
const getUser = async (req, res) => {
  try {
    res.status(201).json(req.user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await pool.query(
      "SELECT user_id, username, email, userrole FROM users"
    );

    res.status(200).json(allUsers.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// Generate JWT TOKEN
const generateToken = (id, name, email) => {
  const payload = {
    user: id,
    user_name: name,
    user_email: email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
};
