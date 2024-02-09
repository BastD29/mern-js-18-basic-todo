const express = require("express");
const dotenv = require("dotenv").config({ path: "./environments/.env.local" });
const connectDB = require("./config/db");
const colors = require("colors");
const cors = require("cors");

connectDB();

const port = process.env.PORT || 5050;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todos", require("./routes/todoRoutes"));

// app.get("", (req, res) => {
//   res.status(200).json({ message: "Hello world" });
// });

app.listen(port, () => console.log(`Server started on port ${port}`));
