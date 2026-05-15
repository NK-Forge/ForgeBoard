const validateId = (paramName) => {
  return (req, res, next) => {
    const id = Number(req.params[paramName]);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: `Invalid ${paramName}`
      });
    }

    next();
  };
};

module.exports = validateId;