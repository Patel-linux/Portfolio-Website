const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");

// ✅ CONNECT TO MONGODB USING ENV VARIABLE FROM RENDER
mongoose
  mongoose
  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));


// Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", ContactSchema);

// Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/skills", (req, res) => {
  res.render("skills");
});

app.get("/projects", (req, res) => {
  res.render("projects");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});


app.post("/contact", async (req, res) => {
  await Contact.create(req.body);
  res.send("✅ Message received!");
});

// Render PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
