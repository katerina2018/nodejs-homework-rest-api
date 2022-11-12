const express = require("express");
const usersController = require("../../controllers/users.controller");
const { tryCatchWrapper } = require("../../helpers");
const { auth } = require("../../middleware/auth");
const userSubscription = require("../../schema/user.subscription");
const validationBody = require("../../middleware/validationBody");

const usersRouter = express.Router();

usersRouter.get(
  "/current",
  tryCatchWrapper(auth),
  tryCatchWrapper(usersController.getContacts)
);
usersRouter.patch(
  "/current",
  validationBody(userSubscription),
  tryCatchWrapper(auth),
  tryCatchWrapper(usersController.subscriptionUsers)
);

module.exports = {
  usersRouter,
};
