require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const contactRoute = require("./route/contactRoute");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", contactRoute);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server listing to port 5000 only`));

