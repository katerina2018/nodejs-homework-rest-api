const express = require("express");
const db = require("../../models/contacts");
const schemaData = require("../../schema/schema");
const validationBody = require("../../middleware/validationBody");
const router = express.Router();

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

router.post("/", validationBody(schemaData), async (req, res, next) => {
  const addContact = await db.addContact(req.body);

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

router.put(
  "/:contactId",
  validationBody(schemaData),
  async (req, res, next) => {
    const { contactId } = req.params;

    const updateContact = await db.updateContact(contactId, req.body);
    if (!updateContact) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    return res.status(200).json({ updateContact: updateContact });
  }
);

module.exports = router;
