require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Default Route
app.get("/", (req, res) => {
  res.send("Inventory management system API is running...");
});

//Server Listen
const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
