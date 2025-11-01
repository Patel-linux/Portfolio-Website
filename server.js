const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", ContactSchema);

// Middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/skills", (req, res) => res.render("skills"));
app.get("/projects", (req, res) => res.render("projects"));
app.get("/contact", (req, res) => res.render("contact"));

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  await Contact.create({ name, email, message });
  res.render("contact", { success: true });
});

// Server
app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
