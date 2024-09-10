import { body, check, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages));
};

const registerValidator = () => [
  body("name", "Please Enter Your name").notEmpty(),
  body("username", "Please Enter Your Username").notEmpty(),
  body("bio", "Please Enter Your Bio").notEmpty(),
  body("password", "Please Enter Your Password").notEmpty(),
  check("avatar", "Please Upload Avatar").notEmpty(),
];

const loginValidator = () => [
  body("username", "Please Enter your Username").notEmpty(),
  body("password", "Please Enter your Password").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Please Enter your Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter your Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be 2-100"),
];

const addMemberValidator = () => [
  body("chatId", "Please Enter your Chat ID").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter your Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be 1-97"),
];

const removeMemberValidator = () => [
  body("chatId", "Please Enter your Chat ID").notEmpty(),
  body("userId", "Please Enter your User ID").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Please Enter your Chat ID").notEmpty(),
  check("files")
    .notEmpty()
    .withMessage("Please Upload Attachments")
    .isArray({ min: 1, max: 5 })
    .withMessage("Attachments must be 1-5"),
];

const chatIdvalidator = () => [
  param("id", "Please Enter your Chat ID").notEmpty(),
];

const renameValidator = () => [
  param("id", "Please Enter your Chat ID").notEmpty(),
  body("name", "Please Enter your New Name").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "Please Enter your User ID").notEmpty(),
];
const acceptRequestValidator = () => [
  body("requestId", "Please Enter your Request ID").notEmpty(),
  body("accept")
  .notEmpty()
  .withMessage("Please Add Accept")
  .isBoolean()
  .withMessage("Accept must be a boolean"),
];

const adminLoginValidator = () => [
  body("secretKey", "Please Enter your Secret KEY").notEmpty(),

];


export {
  addMemberValidator,
  chatIdvalidator,
  loginValidator,
  newGroupValidator,
  registerValidator,
  removeMemberValidator,
  sendAttachmentsValidator,
  validateHandler,
  renameValidator,
  sendRequestValidator,
  acceptRequestValidator,
  adminLoginValidator
};
