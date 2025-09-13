const express = require("express");
const router = require("./router.js");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`La broche tourne sur http://localhost:${PORT}`);
});
