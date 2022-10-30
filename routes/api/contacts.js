const express = require("express");
const Joi = require("joi");
const db = require("../../models/contacts");
const router = express.Router();

const checkData = (name, email, phone, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required(),
    phone: Joi.number().required(),
  });

  const { error } = schema.validate({ name, email, phone });
  if (error) {
    return res.status(400).json({
      message: "missing fields",
      error: error.message,
    });
  }
};

router.get("/", async (req, res, next) => {
  const contacts = await db.listContacts();

  return res.status(200).json({ contacts: contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await db.getContactById(contactId);
  if (!contactById) {
    return res.status(404).json({ message: "Not Found" });
  }
  return res.status(200).json({ contactById: contactById });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  checkData(name, email, phone, res);

  const addContact = await db.addContact({ name, email, phone });

  return res.status(201).json({ newContact: addContact });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await db.removeContact(contactId);
  if (!contactById) {
    return res.status(404).json({ message: "Not Found" });
  }
  return res.status(200).json({ "delete contactById": contactById });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  checkData(name, email, phone, res);

  const updateContact = await db.updateContact(contactId, {
    name,
    email,
    phone,
  });
  if (!updateContact) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  return res.status(200).json({ updateContact: updateContact });
});

module.exports = router;
