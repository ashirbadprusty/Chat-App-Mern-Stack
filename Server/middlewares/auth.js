import jwt from "jsonwebtoken";
import { adminSecretKey } from "../app.js";
import { ErrorHandler } from "../utils/utility.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["chatapp-token"];
  if (!token)
    return next(new ErrorHandler("Please login to acess this routes", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;

  next();
};

const isAdmin = (req, res, next) => {
  const token = req.cookies["chattu-admin-token"];
  if (!token)
    return next(new ErrorHandler("Only admin can acess this routes", 401));

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  const isMatched = secretKey === adminSecretKey;
  if (!isMatched)
    return next(new ErrorHandler("Only admin can acess this routes", 401));

  next();
};

export { isAdmin, isAuthenticated };
