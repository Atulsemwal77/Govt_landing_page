const Student = require("../Models/StudentModal");

// GET all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: students });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST create student
exports.createStudent = async (req, res) => {
  try {
    const { name, num, email, education, location, interest } = req.body;

    if (!name || !num || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, phone number, and email are required",
      });
    }

    const exist = await Student.findOne({ email });
    if (exist) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    const student = new Student({
      name,
      num,
      email,
      education,
      location,
      interest,
    });

    await student.save();

    return res.status(201).json({ success: true, data: student });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
