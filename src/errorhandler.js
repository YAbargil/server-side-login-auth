import { body, validationResult } from "express-validator";
import User from "../modules/usermodule.js";
const findUser = (username) => User.findOne({ username: username }) || null;

const isUsernameTaken = async (req, res, next) => {
  let user = await findUser(req.body.username);
  if (user) {
    res.status(400);
    res.json({ message: "Username already taken!" });
    res.end();
    return;
  }
  next();
  return;
};

export const isUser = async (req, res, next) => {
  let user = await findUser(req.body.username);
  console.log(user);
  if (user == null) {
    res.status(400);
    res.json({ success: false, message: "Not exists." });
    res.end();
    return;
  }
  next();
  return;
};

const recordErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ errors: errors.array() });
    res.status(400);
    res.end();
    return;
  }
  next();
  return;
};
const UserRegisterValidation = [
  body("username")
    .isLength({ min: 4 })
    .withMessage("username must be at least 4 chars long")
    .isLength({ max: 12 })
    .withMessage(" username must be less than 12 chars long")
    .exists()
    .withMessage("username is required"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("password must be at least 5 chars long")
    .isLength({ max: 30 })
    .withMessage("password must be at max 30 chars long"),
  // .matches(/\d/)
  // .withMessage("password must contain a number")
  // .exists(),
];

export const errorHandler = [
  UserRegisterValidation,
  recordErrors,
  isUsernameTaken,
];
