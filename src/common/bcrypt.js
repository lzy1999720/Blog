const bcrypt = require('bcryptjs')

module.exports = {
  encryption (pasword) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {                                // 对明文加密
        bcrypt.hash(pasword, salt, (err, pwd) => {
          if (err) {
            reject(err)
          }
          resolve(pwd)
        })
      })
    })
  },
  decrypt (password,pwd) {
    return new Promise((resolve,reject)=>{
      bcrypt.compare(password, pwd, (err, isOk) => {
        if(err){
          reject(err)
        }
        resolve(isOk)
      })
    })
  }
}