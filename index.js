const server = require("./server");

const PORT = process.env.PORT || 8000;

server.get("/", (req, res) => {
  res.send({ message: `API Running` });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
