const express = require('express');
const path = require('path');
const router = express.Router();
const Mihome = require('../middleware/home')
const Miclassification = require('../middleware/classification')
const comment = require('../middleware/comment');


router.get('/', [Mihome.getNavmenu, Mihome.getmenucategory, Mihome.getcarousr, Mihome.getnewarticle, Mihome
  .getHotarticle
], (req, res) => {                //主页
  res.render(path.resolve(__dirname, '../views/index.html'), {
    menus: req.menus,
    menuscategory: req.menucategory,
    carousrs: req.carousr,
    hots: req.hot,
    news: req.new,
  })
})

router.get('/details', [Mihome.getNavmenu, Mihome.getmenucategory, Mihome.getcarousr, Mihome.getdetails], (req,
  res) => {                                            //博文详情
  res.render(path.resolve(__dirname, '../views/details.html'), {
    menus: req.menus,
    menuscategory: req.menucategory,
    carousrs: req.carousr,
    details: req.details[0],
    leavewords: req.leaveword,
  })
})

router.get('/category', [Mihome.getNavmenu, Mihome.getmenucategory, Mihome.getcategory], (req, res) => { //分类
  res.render(path.resolve(__dirname, '../views/category.html'), {
    categoryitem: req.categoryitem,
    menuscategory: req.menucategory,
    menus: req.menus,
    type: req.type,
    page: req.page,
  })
})

router.get('/classification', [Miclassification.getclassifiction], (req, res) => {             //归档
  res.render(path.resolve(__dirname, '../views/classification.html'), {
    classifictions: req.classifiction
  })
})

router.post('/addleaveword', [comment.addleaveeord], (req, res) => {                 //留言提交
  if (req.state.affectedRows > 0) {
    res.redirect(`/details?id=${req.query.id}`);
  }
})

router.post('/addreply', [comment.addreply], (req, res) => {                       //子留言
  if (req.state.affectedRows > 0) {
    res.redirect(`/details?id=${req.query.id}`);
  }
})

router.post('/search', [Mihome.search, Mihome.getNavmenu, Mihome.getmenucategory,], (req, res) => {   //搜索
  res.render(path.resolve(__dirname, '../views/category.html'), {
    menuscategory: req.menucategory,
    menus: req.menus,
    categoryitem: req.articles
  })
})

module.exports = router;

