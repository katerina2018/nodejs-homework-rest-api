const validationBody = (schemaData) => {
  return async (req, res, next) => {
    const { name, email, phone } = req.body;
    const { error } = schemaData.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({
        message: "missing fields",
        error: error.message,
      });
    }

    next();
  };
};

module.exports = validationBody;
