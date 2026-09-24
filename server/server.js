require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("pa2");
const users = db.collection("users");

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// signup route
app.post("/signup", async (req, res) => {
  const { f_name, l_name, username, password } = req.body;

  // make sure nothing is empty
  if (!f_name || !l_name || !username || !password) {
    return res.status(400).json({ message: "Please fill out all fields" });
  }

  try {
    // check if username is taken
    const existingUser = await users.findOne({ username: username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    await users.insertOne({
      f_name: f_name,
      l_name: l_name,
      username: username,
      password: password
    });

    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

async function connectDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB");
    console.error(error);
  }
}

connectDatabase();

app.listen(9000, () => {
  console.log("Server running on port 9000");
});