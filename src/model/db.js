const mysql = require('mysql');

const pool = mysql.createPool({
    host: '47.102.216.186',
    user: 'blog',
    password: '8Xrt6e8pHr8fRP3H',
    database: 'blog',
    port: '3306',
    multipleStatements: true,
    charset:'utf8mb4'
})
exports.curd = (sqlStr,parameter, callback) => {
    pool.getConnection((err, connection) => {
        if (err) { console.log('连接失败') }
        connection.query(sqlStr,parameter, (err, resulits) => {
            if (err) { console.log(err) }
            callback(err,resulits)
        })
        connection.release()
    })
}

