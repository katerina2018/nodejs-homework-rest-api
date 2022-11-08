const express = require("express");
const contactController = require("../../controllers/contacts.controller");
const { tryCatchWrapper } = require("../../helpers");
const validationBody = require("../../middleware/validationBody");
const { schemaData, schemaDataForPatch } = require("../../schema/schema");
const router = express.Router();

router.get("/", tryCatchWrapper(contactController.getAll));
router.post(
  "/",
  validationBody(schemaData),
  tryCatchWrapper(contactController.create)
);
router.delete("/:id", tryCatchWrapper(contactController.deleteById));
router.put(
  "/:id",
  validationBody(schemaData),
  tryCatchWrapper(contactController.updateById)
);
router.get("/:id", tryCatchWrapper(contactController.findOneById));
router.patch(
  "/:id/favorite",
  validationBody(schemaDataForPatch),
  tryCatchWrapper(contactController.favoriteById)
);
module.exports = router;
