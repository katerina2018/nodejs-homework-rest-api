const Contact = require("../models/contacts");
const { createNotFoundHttpError } = require("../helpers");

async function getAll(req, res, next) {
  const contacts = await Contact.find();

  return res.json({
    data: contacts,
  });
}

async function create(req, res, next) {
  const createdContact = await Contact.create(req.body);

  return res.status(201).json({
    data: {
      contact: createdContact,
    },
  });
}

async function deleteById(req, res, next) {
  const { id } = req.params;

  const contact = await Contact.findById(id);
  if (contact) {
    await Contact.findByIdAndDelete(id);
    return res.json({ data: { contact } });
  }
  return next(createNotFoundHttpError());
}

async function updateById(req, res, next) {
  const { id } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res.json({ data: { contact: updatedContact } });
}

async function findOneById(req, res, next) {
  const { id } = req.params;

  const contact = await Contact.findById(id);
  if (contact) {
    return res.json({ data: { contact } });
  }
  return next(createNotFoundHttpError());
}

async function favoriteById(req, res, next) {
  const { id } = req.params;

  const contact = await Contact.findById(id);
  if (contact) {
    if (req.body.favorite) {
      const updatedStatusContact = await Contact.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );

      return res.json({ data: { contact: updatedStatusContact } });
    }

    return res.status(400).json({ message: "missing field favorite" });
  }
  return next(createNotFoundHttpError());
}
module.exports = {
  getAll,
  create,
  deleteById,
  updateById,
  findOneById,
  favoriteById,
};
