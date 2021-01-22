const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../user-account/model");

//create user
router.post("/", (req, res) => {
  const { username, password, department } = req.body;

  const hash = bcrypt.hashSync(password, 12);

  Users.add({ username, password: hash, department })
    .then((user) => {
      res.status(201).json({ data: user });
    })
    .catch((err) => res.json({ error: err.message }));
});

//logs in the user
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .then((users) => {
      const user = users[0];

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}! Here's your token:`,
          token,
        });
      } else {
        res.status(401).json({ error: "Sorry, you're up to no good!" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

//logs out the user

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };
  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
