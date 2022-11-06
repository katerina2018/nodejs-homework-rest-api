const express = require("express");
const contactController = require("../../controllers/contacts.controller");
const { tryCatchWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", tryCatchWrapper(contactController.getAll));
router.post("/", tryCatchWrapper(contactController.create));
router.delete("/:id", tryCatchWrapper(contactController.deleteById));
router.put("/:id", tryCatchWrapper(contactController.updateById));
router.get("/:id", tryCatchWrapper(contactController.findOneById));
router.patch("/:id/favorite", tryCatchWrapper(contactController.favoriteById));
module.exports = router;
