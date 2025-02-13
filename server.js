require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");


const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Connect to MongoDB Atlas
mongoose
.connect(process.env.MONGO_URI, {
  UseNewUrlParser: true,
  UseUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDb connected successfully");
})
.catch((error) => {
  console.log("MongoDb connection error: ", error);
});

//Default Route
app.get("/", (req, res) => {
  res.send("Inventory management system API is running...");
});

//Server Listen
const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});

app.use("/api/auth", authRoutes);