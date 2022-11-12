const Joi = require("joi");

const userSubscription = Joi.object({
  subscription: Joi.any().valid("starter", "pro", "business"),
});
module.exports = userSubscription;
