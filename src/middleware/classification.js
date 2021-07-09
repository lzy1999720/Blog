const Mohome = require('../model/home.js')
let {jsonpase,reconsitutionData_class} = require('../common/utils')

module.exports = {
  getclassifiction: (req, res, next) => {
    Mohome.connent('select * from article group by releasetime desc;').then(resulits => {          //归档
      req.classifiction = reconsitutionData_class(jsonpase(resulits))
      // console.log(req.classifiction)
      next()
    }).catch(err => {
      next(err)
    })
  }
}