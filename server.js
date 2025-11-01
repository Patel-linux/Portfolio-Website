const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");

// ✅ Mongoose settings
mongoose.set("strictQuery", false);

// ✅ CONNECT TO MONGODB USING ENV VARIABLE (Render)
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 15000, // wait 15 sec before timeout
    socketTimeoutMS: 45000           // prevent socket timeout error
  })
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

// ✅ Routes
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

// ✅ Contact POST Route
app.post("/contact", async (req, res) => {
  try {
    await Contact.create(req.body);
    res.send("✅ Message received and saved successfully!");
  } catch (error) {
    console.log("❌ Error saving contact:", error);
    res.status(500).send("❌ Server error. Could not save message.");
  }
});

// ✅ Render uses PORT from Environment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
