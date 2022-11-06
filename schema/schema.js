const { Schema } = require("mongoose");

const contactSchema = new Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
});

const Joi = require("joi");

const schemaData = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .min(5)
    .pattern(/^[0-9-]+$/, "numbers")
    .required(),
});

module.exports = { contactSchema, schemaData };
