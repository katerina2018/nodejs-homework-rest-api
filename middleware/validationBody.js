const validationBody = (schemaData) => {
  return async (req, res, next) => {
    const { error } = schemaData.validate(req.body);
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
