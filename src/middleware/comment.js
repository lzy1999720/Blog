const Mohome = require('../model/home.js')
let { formatTime, jsonpase, newtime } = require('../common/utils')
const { generateToken,analysisToken } = require('../common/token.js')
const jwt = require('jsonwebtoken')
const {decrypt} = require('../common/bcrypt.js')


module.exports = {
  addleaveeord: (req, res, next) => {
    Mohome.connent('insert into leaveword values(null,?,?,?,?,?,?,0);', [req.query.id, req.body.name, null, req.body.value, newtime, req.body.email]).then(resulits => {
      req.state = resulits
      next()
    }).catch(err => {
      next(err)
    })
  },
  addreply: (req, res, next) => {
    Mohome.connent('insert into reply values(null,?,?,?,?,?,?,0)', [req.query.rlid, req.body.name, null, req.body.value, newtime, req.body.email]).then(resulits => {
      req.state = resulits
      next()
    }).catch(err => {
      next(err)
    })
  },
  login: (req, res, next) => {
    let { user, password } = req.body
    Mohome.connent('select * from userinfo where accountnumber= ?', [user]).then(results => {
      if (results.length) {    
        const { id,pwd } = results[0]
        decrypt(password,pwd).then(isok=>{
          if(isok){
            req.token = generateToken(user, id, 60 * 60)                 //登录成功返回token
            req.state = results
            next()
            return
          }else{
            req.state = false               //用户密码与解密密码不一致
            next()
            return
          }
        }).catch(err=>{
          next(err)
        })
      }else{                                                            //用户不存在
        req.state = results.length
        next()
        return
      }
    }).catch(err => {
      next(err)
    })
  }
}


