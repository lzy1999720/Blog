const mysql = require('mysql');
// const config = {
//     user: 'sa',
//     password: '1234',
//     server: '127.0.0.1',
//     database: 'Blog',
// };
// exports.curd = (sqlStr, callback) => {
//     mssql.connect(config, (err) => {
//         if (err) {
//             console.log(err.message)
//         }
//         new mssql.Request().query(sqlStr, (err, recordset) => {
//             callback(err, recordset)
//         })
//     })
// }

const pool = mysql.createPool({
    host: '47.102.216.186',
    user: 'blog',
    password: '8Xrt6e8pHr8fRP3H',
    database: 'blog',
    portw: '3306'
})
exports.curd = (sqlStr, callback) => {
    pool.getConnection((err, connection) => {
        if (err) { console.log('连接失败') }
        connection.query(sqlStr, (err, resulits) => {
            if (err) { console.log(err) }
            callback(err,resulits)
        })
        connection.release()
    })
}