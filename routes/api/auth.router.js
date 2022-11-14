const express = require("express");
const authController = require("../../controllers/auth.controller");
const usersController = require("../../controllers/users.controller");
const { tryCatchWrapper } = require("../../helpers");
const authSchemaData = require("../../schema/auth.schema");
const validationBody = require("../../middleware/validationBody");
const { auth } = require("../../middleware/auth");
const userSubscription = require("../../schema/user.subscription");
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

authRouter.get(
  "/",
  tryCatchWrapper(auth),
  tryCatchWrapper(usersController.getContacts)
);
authRouter.patch(
  "/",
  validationBody(userSubscription),
  tryCatchWrapper(auth),
  tryCatchWrapper(usersController.subscriptionUsers)
);

module.exports = {
  authRouter,
};
