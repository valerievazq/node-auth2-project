const jwt = require("jsonwebtoken");
const users = require("../user-account/model");

async function protected(req, res, next) {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const user = await users.findById(decoded.subject);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "you shall not pass!!" });
  }
}

module.exports = protected;
