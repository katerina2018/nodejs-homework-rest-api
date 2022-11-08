const Joi = require("joi");

const schemaData = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .min(5)
    .pattern(/^[0-9-]+$/, "numbers")
    .required(),
});

const schemaDataForPatch = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string(),
  phone: Joi.string()
    .min(5)
    .pattern(/^[0-9-]+$/, "numbers"),
});

module.exports = { schemaData, schemaDataForPatch };
