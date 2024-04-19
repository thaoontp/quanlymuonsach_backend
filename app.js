const express = require("express");
const app = express();
const path = require("path");

const config = require("./app/config");

const PORT = 3000;
const cors = require("cors");
const route = require("./routes");

const db = require("./app/utils/mongodb.util");

app.use(cors());
app.use(express.static(path.join(__dirname, "upload")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.connect();

route(app);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
