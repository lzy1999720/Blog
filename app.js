const express = require('express');
const app = express();
const cors = require('cors')
const router = require('./src/router/router.js')
const api = require('./src/router/backstageApi.js')
const bodyParser = require('body-parser');

const expressjwt = require('express-jwt')
const { analysisToken } = require('./src/common/token.js')


app.use(bodyParser.json())               //使用req.body拿post参数
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('html', require('express-art-template'))
app.use(cors())                   //解决跨域

app.use(expressjwt({
    credentialsRequired: false,   //是否有无token也验证
    algorithms: ['HS256'],       //高版本必须加签名算法 默认HS256
    secret: "Fizz",  //加密密钥
}).unless({
    path: ["/api/login", "/"]        //添加不需要token验证的路由
}));

app.use('/', router);
app.use('/api', api)
app.use('/api/', function (req, res, next) {
    let tokenstate = analysisToken(req.headers.authorization)
    if (!tokenstate.code) {
        res.status(402).send(tokenstate.msg)
        return
    }
    next()
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send('token解析错误')
    }
})
app.use('/public/', express.static(__dirname + '/src/public/'))


app.listen(1314, '0.0.0.0', () => {
    console.log('ok！')
})

