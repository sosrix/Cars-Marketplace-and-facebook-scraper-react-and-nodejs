const { createPool } = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "passwordHERE",
  database: "marketbase",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

pool.query(`select * from marketbase.carslisted`, (err, result) => {
  return app.get("/get", (req, res) => {
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("running on port 30001");
});
