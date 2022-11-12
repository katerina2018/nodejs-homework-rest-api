const Contact = require("../models/contacts.model");
const { createNotFoundHttpError } = require("../helpers");

async function getAll(req, res, next) {
  const { limit, page } = req.query;
  const { favorite } = req.query;
  console.log(":", favorite);
  let contacts = {};

  contacts = await Contact.find({});

  if (limit || page) {
    const skip = (page - 1) * limit;
    contacts = await Contact.find({}).skip(skip).limit(limit);
  }

  if (favorite) {
    contacts = await Contact.find({ favorite: "true" }).exec();
  }

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

  const contact = await Contact.findByIdAndDelete(id);
  if (contact) {
    return res.json({ data: { contact } });
  }
  return next(createNotFoundHttpError());
}

async function updateById(req, res, next) {
  const { id } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updatedContact) {
    return res.json({ data: { contact: updatedContact } });
  }
  return next(createNotFoundHttpError());
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

  const updatedStatusContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updatedStatusContact) {
    return res.json({ data: { contact: updatedStatusContact } });
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
