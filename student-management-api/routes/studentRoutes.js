const express = require("express");
const students = require("../data/students");

const router = express.Router();

// Helper: validate request body
const isValidBody = (body) =>
  body &&
  typeof body.name === "string" && body.name.trim() !== "" &&
  typeof body.course === "string" && body.course.trim() !== "";

// Helper: find student index by id param (returns -1 if not found, null if invalid id)
const findIndex = (idParam) => {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) return null;
  return students.findIndex((s) => s.id === id);
};

// GET /students - all students
router.get("/", (req, res) => {
  res.status(200).json(students);
});

// GET /students/:id - one student
router.get("/:id", (req, res) => {
  const index = findIndex(req.params.id);
  if (index === null) return res.status(400).json({ error: "Invalid student ID" });
  if (index === -1) return res.status(404).json({ error: "Student not found" });
  res.status(200).json(students[index]);
});

// POST /students - add student
router.post("/", (req, res) => {
  if (!isValidBody(req.body)) {
    return res.status(400).json({ error: "Both 'name' and 'course' are required" });
  }
  const nextId = students.length ? Math.max(...students.map((s) => s.id)) + 1 : 1;
  const student = { id: nextId, name: req.body.name.trim(), course: req.body.course.trim() };
  students.push(student);
  res.status(201).json(student);
});

// PUT /students/:id - update student
router.put("/:id", (req, res) => {
  const index = findIndex(req.params.id);
  if (index === null) return res.status(400).json({ error: "Invalid student ID" });
  if (!isValidBody(req.body)) {
    return res.status(400).json({ error: "Both 'name' and 'course' are required" });
  }
  if (index === -1) return res.status(404).json({ error: "Student not found" });

  students[index] = {
    id: students[index].id,
    name: req.body.name.trim(),
    course: req.body.course.trim(),
  };
  res.status(200).json(students[index]);
});

// DELETE /students/:id - remove student
router.delete("/:id", (req, res) => {
  const index = findIndex(req.params.id);
  if (index === null) return res.status(400).json({ error: "Invalid student ID" });
  if (index === -1) return res.status(404).json({ error: "Student not found" });

  const [removed] = students.splice(index, 1);
  res.status(200).json({ message: "Student deleted", student: removed });
});

module.exports = router;
