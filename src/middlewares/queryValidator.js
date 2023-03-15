const queryRateValidator = (req, res, next) => {
  const { rate } = req.query;
  const rateNumber = Number(rate);
  if (rate === undefined) {
    next();
  }
  if (rateNumber < 1 || rateNumber > 5 || rateNumber % 1 !== 0) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

module.exports = {
  queryRateValidator,
};