const jwt = require('jsonwebtoken');

async function checkLogin(req, res, next) {
  const token = req.body.token;

  if (token) {
 
    try {
     
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({
        errors: {
          common: {
            message: "Invalid or expired token",
          },
        },
      });
    }
  } else {
    res.status(401).json({
      errors: {
        common: {
          message: "Missing token",
        },
      },
    });
  }
}

module.exports = {
  checkLogin,
};
