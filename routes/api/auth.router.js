const express = require("express");
const authController = require("../../controllers/auth.controller");
const { tryCatchWrapper } = require("../../helpers");
const authSchemaData = require("../../schema/auth.schema");
const validationBody = require("../../middleware/validationBody");
const { auth } = require("../../middleware/auth");
const authRouter = express.Router();

authRouter.post(
  "/signup",
  validationBody(authSchemaData),
  tryCatchWrapper(authController.signup)
);
authRouter.post(
  "/login",
  validationBody(authSchemaData),
  tryCatchWrapper(authController.login)
);
authRouter.get(
  "/logout",
  tryCatchWrapper(auth),
  tryCatchWrapper(authController.logout)
);

module.exports = {
  authRouter,
};
