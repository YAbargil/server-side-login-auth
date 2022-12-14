import mongoose from "../src/db.js";

var stedentSchema = mongoose.Schema({
  id: String,
  name: String,
  degreeName: String,
});
stedentSchema.methods.printMe = function () {
  console.log(
    `Student ${this.id}: name ${this.name}  learns ${this.degreeName}`
  );
};
var Student = mongoose.model("student", stedentSchema);

export default Student;
