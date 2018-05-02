// Authentication Middleware
const UserTokens = require('../models/userTokens');

const unsecureUrls = ['/api/login'];
const auth = function (req, res, next) {
  let message = 'Unauthorized';
  if (unsecureUrls.indexOf(req.url) < 0) {
    let authHeader = req.get('Authorization');
    if (authHeader) {
      let token = authHeader.replace('Bearer ', '');
      UserTokens.getByToken(token, function(err, rows) {
        if (err) {
          res.status(401).json({"error": true, "message": message});
        } else {
          if (rows.length) {
            let row = rows[0];
            let expirationDate = new Date(row.expiration_date);
            let now = new Date();
            if (expirationDate < now) {
              message += ': token has expired';
              res.status(401).json({"error": true, "message": message});
            } else {
              next();
            }
          } else {
            message += ': Invalid token';
            res.status(401).json({"error": true, "message": message});
          }
        }
      });
    } else {
      res.status(401).json({"error": true, "message": message});
    }
  } else {
    next();
  }
}
module.exports.auth = auth;
