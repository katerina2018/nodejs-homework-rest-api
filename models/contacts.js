const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const dbPath = path.join(__dirname, "./contacts.json");

const getDb = async () => {
  const dbRaw = await fs.readFile(dbPath);
  const db = JSON.parse(dbRaw);
  return db;
};

const listContacts = async () => {
  const contacts = await getDb();
  return contacts;
};

const getContactById = async (contactId) => {
  const db = await getDb();
  const contact = db.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const db = await getDb();
  const contact = db.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  const contacts = db.filter((item) => item.id !== contactId);

  await fs.writeFile(dbPath, JSON.stringify(contacts));
  return contact;
};

const addContact = async ({ name, email, phone }) => {
  const id = nanoid();
  const contact = { id, name, email, phone };

  const db = await getDb();
  db.push(contact);
  await fs.writeFile(dbPath, JSON.stringify(db));
  return contact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const db = await getDb();

  const index = db.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const updateContact = { id: contactId, name, email, phone };

  db.splice(index, 1, updateContact);
  await fs.writeFile(dbPath, JSON.stringify(db));
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
