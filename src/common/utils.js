module.exports = utils = {
  formatTime: (date) => { //时间戳转换
    var d = new Date(date);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() 
    + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();   //时分秒
  },
  jsonpase: (jsonstr) => {
    return JSON.parse(JSON.stringify(jsonstr));
  },
  newtime: new Date(),              //获取当前时间戳
  reconsitutionData_class: (data) => {                                        //归档数据分组
    let newdata = []
    data.forEach((item, i) => {
      let index = 0
      item.releasetime = utils.formatTime(item.releasetime, 'Y年-M月')
      let isRepetition = newdata.some((newitem, j) => {
        if (newitem.releasetime == item.releasetime) {
          index = j;
          return true;
        }
      })
      if (!isRepetition) {
        newdata.push({
          releasetime: item.releasetime,
          sublist: [item]
        })
      } else {
        newdata[index].sublist.push(item);
      }
    });
    return newdata;
  },
  reconsitutionleaveword: (leaveword, reply) => {                        //评论回复数据分组
    let newdata = [];
    leaveword = utils.jsonpase(leaveword);
    reply = utils.jsonpase(reply);
    leaveword.forEach((litem, lindex) => {
      litem.sublist = [];
      newdata.push(litem);
      reply.forEach((ritem, rindex) => {
        if (litem.lid == ritem.rlid) {
          newdata[lindex].sublist.push(ritem);
        }
      })
    })
    return newdata;
  }
}
