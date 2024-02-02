const validate = (schema, type) => (req, res, next) => {
  // type will be one of body, query, params
  const { error } = schema.validate(req[type]);
  if (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
      status: 400,
    });
  }

  return next();
};

module.exports = { validate };
