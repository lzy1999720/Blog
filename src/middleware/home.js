const Mohome = require('../model/home.js')
const { encryption, decrypt } = require('../common/bcrypt.js')
let { formatTime, jsonpase, reconsitutionleaveword, newtime } = require('../common/utils')

const { json } = require('body-parser')
module.exports = {
  getNavmenu: (req, res, next) => {                      //菜单导航
    Mohome.connent(`select * from navmenu;`).then(resulits => {
      req.menus = jsonpase(resulits)
      next()
    }).catch(err => {
      if (err) {
        next(err)
      }
    })
  },

  getmenucategory: (req, res, next) => {                  //文章分类
    Mohome.connent(`select * from articleclass order by  aindex asc;`).then(results => {
      req.menucategory = jsonpase(results)
      next()
    }).catch(err => {
      if (err) {
        next(err)
      }
    })
  },

  getcarousr: (req, res, next) => {                     //获取轮播图
    Mohome.connent(`select * from carousr;`).then(results => {
      req.carousr = jsonpase(results)
      next()
    }).catch(err => {
      if (err) {
        next(err)
      }
    })
  },

  getHotarticle: (req, res, next) => {                  //热门文章
    Mohome.connent(`select * from article order by fabulous desc limit 6;`).then(results => {
      results.filter(i => {
        i.releasetime = formatTime(i.releasetime)
      })
      req.hot = jsonpase(results)
      next()
    }).catch(err => {
      if (err) {
        next(err)
      }
    })
  },
  getnewarticle: (req, res, next) => {                   //最新文章
    Mohome.connent(`select * from article order by releasetime desc limit 5;`).then(results => {
      results.filter(i => {
        i.releasetime = formatTime(i.releasetime)
      })
      req.new = jsonpase(results)
      next()
    }).catch(err => {
      if (err) {
        next(err)
      }
    })
  },


  getdetails: (req, res, next) => {                          //文章详情
    Mohome.connent(`select * from article where aid = ${req.query.id};
    select * from leaveword where aid = ${req.query.id} order by ltime desc;
    select * from reply;
    `).then(results => {
      results.forEach(item => {
        item.filter(i => {
          i.releasetime = formatTime(i.releasetime)
          i.ltime = formatTime(i.ltime)
        })
      });
      req.details = jsonpase(results)
      req.leaveword = reconsitutionleaveword(results[1], results[2])
      next()
    }).catch(err => {
      if (err) {
        next(err)
      }
    })
  },

  getcategory: (req, res, next) => {                          //分类页
    let pagesize = 6
    let offset = ((parseInt(req.query.page) - 1) * 5)
    let type = req.query.type
    Mohome.connent(`select * from article where aclass= '${type}' limit ${offset},${pagesize};
    `).then(results => {
      results.filter(i => {
        i.releasetime = formatTime(i.releasetime)
      })
      req.categoryitem = jsonpase(results)
      req.type = type
      req.page = parseInt(req.query.page)
      next()
    }).catch(err => {
      if (err) {
        next(err)
      }
    })
  },
  search: (req, res, next) => {                             //搜索
    Mohome.connent(` select * from article where title like '%${req.body.title}%';`).then((results) => {
      results.filter(i => {
        i.releasetime = formatTime(i.releasetime)
      })
      req.articles = jsonpase(results)
      next()
    }).catch(err => {
      next(err)
    })
  },
  getallarticle: (req, res, next) => {                     //后台获取文章
    Mohome.connent('select * from article;').then(results => {
      req.allarticles = jsonpase(results)
      next()
    }).catch(err => {
      next(err)
    })
  },
  updatearticle: (req, res, next) => {                   //更新文章  
    Mohome.connent(`update article set aclass = ?,title=?,content=?,apictureurl=?,releasetime=?,fabulous=? where aid = ?;`, [req.body.aclass, req.body.title, req.body.content, req.body.apictureurl, req.body.releasetime, req.body.fabulous, req.body.aid]).then(results => {
      req.msg = results
      next()
    }).catch(err => {
      next((err))
    })
  },
  addarticles: (req, res, next) => {                    //添加文章
    Mohome.connent(`insert into article values(null,?,?,?,null,?,?);`, [req.body.aclass, req.body.title, req.body.content, req.body.releasetime, req.body.fabulous]).then(results => {
      req.msg = results
      next()
    }).catch(err => {
      next(err)
    })
  },
  removearticles: (req, res, next) => {                    //删除文章
    Mohome.connent(`delete from article where aid in(?);`, [req.body.aid]).then(results => {
      req.msg = results
      next()
    }).catch(err => {
      next(err)
    })
  },
  getComment: (req, res, next) => {                      //获取留言数据
    Mohome.connent('select a.user,a.lvalue,a.ltime,a.mailbox,a.isexamine,a.lid,b.title,b.aclass from leaveword as a left join article as b on a.aid = b.aid join articleclass as c on b.aclass =c.aclassvalue;').then(results => {
      res.comments = results
      next()
    }).catch(err => {
      next(err)
    })
  },
  updateCommentStatus: (req, res, next) => {                       //更新评论状态
    Mohome.connent(`update leaveword set isexamine = ? where lid = ?;`, [req.body.isexamine, req.body.lid]).then(results => {
      req.state = results
      next()
    }).catch(err => {
      next(err)
    })
  },
  deleteComment: (req, res, next) => {
    Mohome.connent(`delete from leaveword where lid = ?`, [req.body.lid]).then(results => {
      req.state = results
      next()
    }).catch(err => {
      next(err)
    })
  },
  getuser: (req, res, next) => {
    Mohome.connent(`select * from userinfo`, []).then(results => {
      req.user = results
      next()
    }).catch(err => {
      next(err)
    })
  },
  deleteuser: (req, res, next) => {
    Mohome.connent(`delete from userinfo where id =?;`, [req.body.uid]).then(results => {
      req.state = results
      next()
    }).catch(err => {
      next(err)
    })
  },
  updateduser: (req, res, next) => {
    let { id, accountnumber, pwd, mailbox, role } = req.body
    Mohome.connent(`update userinfo set accountnumber = ?,pwd=?,mailbox=?,role=? where id = ?;`, [accountnumber, pwd, mailbox, role, id]).then(results => {
      req.state = results;
      next()
    }).catch(err => {
      next(err)
    })
  },
  adduserinfo: (req, res, next) => {
    let { accountnumber, pwd, mailbox, role, creationtime } = req.body
    encryption(pwd).then(results => {
      if(results){  
        adduser(results)
      }
    }).catch(err => {
      console.log(err)
    })

    function adduser (pwd) {
      Mohome.connent(`select * from userinfo where accountnumber = ?;`, [accountnumber]).then(results1 => {
        if (results1.length) {
          req.Doesitexist = results1
          next()
          return
        }
        Mohome.connent(`insert into userinfo values(null,?,?,?,?,?);`, [accountnumber, pwd, mailbox, role, creationtime]).then(results => {
          req.state = results
          next()
        }).catch(err => {
          next(err)
        })
      }).catch(err => {
        next(err)
      })
    }
  }
}
