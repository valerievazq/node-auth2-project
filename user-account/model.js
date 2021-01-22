const db = require("../data/config");

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").select("id", "username", "password").where(filter);
}

function findByRole(user) {
  return db("users").select();
}

function findById(id) {
  return db("users")
    .select("id", "username", "department")
    .where({ id })
    .first();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByRole,
};
