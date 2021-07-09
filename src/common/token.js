const jwt = require('jsonwebtoken')
module.exports = {
  generateToken: (user, id, expiresIn) => {
    return jwt.sign({ user: user, id: id }, 'Fizz', { expiresIn: expiresIn })
  },
  analysisToken (token) {
    return jwt.verify(token, 'Fizz', function (err, token) {
      if (!token) {
        let satet = {
          code: 0,
          msg: '无token'
        }
        return satet
      }
      if (err) {
        if (err.name == 'TokenExpiredError') {//token过期
          let satet = {
            code: 0,
            msg: 'token过期'
          }
          return satet
        } else if (err.name == 'JsonWebTokenError') {//无效的token
          let satet = {
            code: 0,
            msg: '无效的token'
          }
          return satet
        }
      } else {
        return token;
      }
    })
  }
}