import * as bcrypt from "bcrypt";
import User from "../modules/usermodule.js";
import { createToken } from "./auth.js";
const salt = 5;
const comparePasswords = (password, hash) => bcrypt.compare(password, hash);
const hashPassword = (password) => bcrypt.hash(password, salt);
const findUser = (username) => User.findOne({ username: username }) || null;

export const signup = async (req, res) => {
  const json = await signUser({
    username: req.body.username,
    password: req.body.password,
  });
  console.log("json returned:", json);
  res.json(json);
  res.end();
};

async function signUser({ username, password }) {
  console.log(username, password);
  let hash = await hashPassword(password);
  let user = new User({
    username: username,
    password: hash,
  });
  const token = await createToken(username);
  try {
    user.save();
    return {
      message: `${user.username} has succesfully created and saved in DB.`,
      token: token,
    };
  } catch (err) {
    console.log("Couldnt save user", err);
  }
}

export const login = async (req, res) => {
  var status;
  const json = await logUser({
    username: req.body.username,
    password: req.body.password,
  });
  status = json.success ? 201 : 401;
  res.status(status);
  res.json(json);
  res.end();
};

async function logUser({ username, password }) {
  const hashed = await hashPassword(password);
  const isValid = await comparePasswords(password, hashed);
  if (!isValid) {
    return {
      success: false,
      message: `Incorrect password.`,
    };
  }
  const token = createToken(username);
  return {
    success: true,
    message: ` ${username} has logged in succesfully.`,
    token: token,
  };
}
