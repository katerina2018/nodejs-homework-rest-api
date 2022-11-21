const multer = require("multer");
const path = require("path");

const { TEMP_DIR } = require("../helpers/consts");

const storage = multer.diskStorage({
  destination: TEMP_DIR,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = { upload };
