const { redis } = require("../db.js");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json("Unauthorized");
  }
  const answer = await redis.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json("Unauthorized");
    }
  });
  if (answer) {
    return next();
  }
};

module.exports = {
  requireAuth: requireAuth,
};
