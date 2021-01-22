const express = require("express");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const Users = require("./model");
const protected = require("../middleware/restricted");

const router = express.Router();

router.get("/", protected, (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ data: users });
    })
    .catch((err) => res.send(err));
});

// router.post("/login", (req, res) => {
//   let { username, password } = req.body;

//   Users.findBy({ username })
//     .first()
//     .then((user) => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         res.status(200).json({ message: `Welcome ${user.username}!` });
//       } else {
//         res.status(401).json({ message: "Invalid Credentials" });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json(error);
//     });
// });

// router.get("/logout", async (req, res, next) => {
//   if (req.session) {
//     req.session.destroy((err) => {
//       if (err) {
//         res.json({
//           message: "You can check out anytime, but you can never leave",
//         });
//       } else {
//         res.status(200).json({ message: "goodbye!" });
//       }
//     });
//   } else {
//     res.status(200).json({ message: "you were nevere here to begin with" });
//   }
// });

module.exports = router;
