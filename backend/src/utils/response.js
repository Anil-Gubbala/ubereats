const response = {
  unauthorized: (res, message) => res.status(401).send({ err: message }),
  error: (res, status, code) => res.status(status).send({ err: code }),
};

module.exports = { response };
