const sqldb = require('./db.js')
module.exports.connent = (str,parameter) => {
    return new Promise((resolve, reject) => {
        sqldb.curd(str,parameter, (err, res) => {
            if (err) {
                reject(err)
            } else { resolve(res) }
        })
    })
}
// var pag = [];
// var PageCount = Math.ceil(recordset.recordsets[5].length / 5)