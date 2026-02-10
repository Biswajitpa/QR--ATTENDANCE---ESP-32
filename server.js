// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000; // Match frontend fetch

// ------------------ Middleware ------------------
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Serve frontend files

// ------------------ MongoDB Connection ------------------
mongoose.connect(
  'mongodb+srv://Biswajit:Biswajit%234321@cluster0.pynvqbg.mongodb.net/collegeDB?retryWrites=true&w=majority'
)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// ------------------ Schemas ------------------
const userSchema = new mongoose.Schema({ username: String, password: String });
const studentSchema = new mongoose.Schema({ studentId: String, name: String, branch: String, subjects: [String] });
const attendanceSchema = new mongoose.Schema({
  studentId: String,
  subject: String,
  token: String,
  date: { type: Date, default: Date.now }
});

// ------------------ Models ------------------
const User = mongoose.model('User', userSchema);
const Student = mongoose.model('Student', studentSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);

// ------------------ Seed Users ------------------
User.insertMany([
  { username: "Swarna", password: "Swarna123" },
  { username: "Biswajit", password: "Biswajit123" }
])
  .then(() => console.log("Users added"))
  .catch(() => console.log("Users already exist"));

// ------------------ APIs ------------------

// Login API
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if(user) res.json({ success: true, message: "Login successful" });
    else res.json({ success: false, message: "Invalid username or password" });
  } catch(err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get students API (by studentId or subject)
app.get('/students', async (req, res) => {
  const { studentId, subject } = req.query;
  try {
    if(studentId) {
      const student = await Student.findOne({ studentId });
      res.json(student);
    } else if(subject) {
      const students = await Student.find({ subjects: subject });
      res.json(students);
    } else {
      const students = await Student.find();
      res.json(students);
    }
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching students" });
  }
});

// Mark attendance API
app.post('/mark-attendance', async (req, res) => {
  const { subject, token } = req.body;

  // Extract studentId from token (format: studentId-subject-timestamp)
  const studentId = token.split('-')[0];

  try {
    const existing = await Attendance.findOne({ token });
    if(existing) return res.status(400).send("Attendance already marked");

    await Attendance.create({ studentId, subject, token });
    res.send("Attendance marked successfully!");
  } catch(err) {
    console.error(err);
    res.status(500).send("Error saving attendance");
  }
});

// ------------------ Start Server ------------------
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
