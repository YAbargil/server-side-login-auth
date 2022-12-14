import mongoose from "../src/db.js";

var userSchema = mongoose.Schema({
  username: String,
  password: String,
});
userSchema.methods.printMe = function () {
  console.log(`Username ${this.username}`);
};
var User = mongoose.model("users", userSchema);

export default User;
