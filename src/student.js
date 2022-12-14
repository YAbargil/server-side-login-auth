import Student from "../modules/studentmodule.js";

export async function createStudent({ id, name, degreeName }) {
  var json = "";
  var temp = await Student.findOne({ id: id });
  if (temp) {
    json = { message: "Student already exists!" };
    return json;
  }
  var student = new Student({
    id: id,
    name: name,
    degreeName: degreeName,
  });
  try {
    const json = await student.save();
    student.printMe();
    return json;
  } catch (err) {
    console.log("Couldnt save student in DB");
    console.error(err);
  }
}

export function getAllStudents() {
  return Student.find({});
}

export function getStudent(id) {
  return Student.findOne({ id: id });
}

export async function presentStudentDetails(id) {
  const student = await Student.find({ id: id });
  console.log(student);
  return student;
}
