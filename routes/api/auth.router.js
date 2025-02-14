const express = require("express");
const authController = require("../../controllers/auth.controller");
const usersController = require("../../controllers/users.controller");
const { tryCatchWrapper } = require("../../helpers");
const { authSchemaData } = require("../../schema/auth.schema");
const validationBody = require("../../middleware/validationBody");
const { auth } = require("../../middleware/auth");
const userSubscription = require("../../schema/user.subscription");
const { upload } = require("../../middleware/uploadFile");
const authRouter = express.Router();
const { verifySchemaUser } = require("../../schema/auth.schema");
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
authRouter.patch(
  "/avatars",
  tryCatchWrapper(auth),
  tryCatchWrapper(upload.single("avatar")), // save it tmp directory
  tryCatchWrapper(usersController.updatedAvatarURL)
);

authRouter.get(
  "/verify/:verificationToken",

  tryCatchWrapper(authController.verifyEmail)
);

authRouter.post(
  "/verify",
  validationBody(verifySchemaUser),
  tryCatchWrapper(authController.ResendingVerifyEmail)
);

module.exports = {
  authRouter,
};
