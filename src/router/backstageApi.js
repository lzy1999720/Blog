const express = require('express');
const api = express.Router();
const Mihome = require('../middleware/home')
const comment = require('../middleware/comment');


api.post('/login', [comment.login], (req, res) => {   
  if (req.state) {
    res.status(200).send({
      msg: '登录成功！',
      token: req.token,
      state: 1
    })
    return
  } else {
    res.status(200).send({
      msg: '账号或密码错误！',
      state: 0
    })
    return
  }
})


api.get('/article', [Mihome.getallarticle, Mihome.getmenucategory], (req, res) => {
  res.send([req.allarticles, req.menucategory]);
})

api.post('/updateart', [Mihome.updatearticle], (req, res) => {
  if (req.msg.affectedRows >= 1) {
    res.send({
      msg: '修改成功！',
      state: 1
    })
    return
  }
  res.send({
    msg: '修改失败！',
    state: 0
  })
})

api.post('/addarticles', [Mihome.addarticles], (req, res) => {
  if (req.msg.affectedRows >= 1) {
    res.send({
      msg: '添加成功！',
      state: 1
    })
    return
  }
  res.send({
    msg: '添加失败！',
    state: 0
  })
})

api.post('/removearticles', [Mihome.removearticles], (req, res) => {
  if (req.msg.affectedRows >= 1) {
    res.send({
      msg: '删除成功！',
      state: 1
    })
    return
  }
  res.send({
    msg: '删除失败！',
    state: 0
  })
})

api.post('/searchad', [Mihome.search], (req, res) => {
  if (req.articles) {
    res.send({
      msg: '查询成功！',
      state: 1,
      categoryitem: req.articles
    })
    return
  }
  res.send({
    msg: '查询失败！',
    state: 0
  })
})

api.get('/getComment', [Mihome.getComment], (req, res) => {
  res.send(res.comments)
})



api.post('/updateCommentStatus', [Mihome.updateCommentStatus], (req, res) => {                     //是否展示某个评论
  if (req.state.changedRows >= 1) {
    res.send({
      msg: '修改成功！',
      state: 1
    })
    return
  }
  res.send({
    msg: '修改失败！',
    state: 0
  })
})


api.post('/deleteComment', [Mihome.deleteComment], (req, res) => {                      //删除用户评论
  if (req.state.affectedRows >= 1) {
    res.send({
      msg: '删除成功！',
      state: 1
    })
    return
  }
  res.send({
    msg: '删除失败！',
    state: 0
  })
})


api.get('/user', [Mihome.getuser], (req, res) => {
  res.send(req.user)
})

api.post('/deleteuser', [Mihome.deleteuser], (req, res) => {
  if (req.state.affectedRows >= 1) {
    res.send({
      msg: '删除成功！',
      state: 1
    })
    return
  }
  res.send({
    msg: '删除失败！',
    state: 0
  })
})

api.post('/updateduser', [Mihome.updateduser], (req, res) => {
  if (req.state.affectedRows >= 1) {
    res.send({
      msg: '修改成功！',
      state: 1
    })
    return
  }
  res.send({
    msg: '修改失败！',
    state: 0
  })
})

api.post('/adduserinfo', [Mihome.adduserinfo], (req, res) => {
  if (req.Doesitexist) {
    res.send({
      msg: '该用户已存在！',
      state: 0
    })
    return
  }
  if (req.state.affectedRows >= 1) {
    res.send({
      msg: '添加成功！',
      state: 1
    })
    return
  }
  res.send({
    msg: '添加失败！',
    state: 0
  })
})

module.exports = api;

