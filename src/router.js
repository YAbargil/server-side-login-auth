import { Router } from "express";
import {
  createStudent,
  getAllStudents,
  presentStudentDetails,
} from "./student.js";

const router = Router();

router.get("/all_students", async (req, res, next) => {
  try {
    const student = await getAllStudents();

    res.json({
      success: true,
      total: student.length,
      students: student,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/student/create", async (req, res) => {
  const json = await createStudent({
    id: req.body.id,
    name: req.body.name,
    degreeName: req.body.degreeName,
  });
  res.json(json);
  res.end();
});

router.get("/student/:id", async (req, res) => {
  const student = (await presentStudentDetails(req.params.id)) || null;
  if (student.length) {
    res.json({
      success: true,
      student: student,
    });
  } else {
    res.json({ success: false });
  }
  res.end();
});

export default router;
