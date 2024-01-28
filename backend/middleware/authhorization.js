const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json("Not Authorize");
    }
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // req.user = payload.user

    req.user = {
      user: payload.user,
      user_name: payload.user_name,
      user_email: payload.user_email,
    };

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(403).json("Not Authorize");
  }
};
