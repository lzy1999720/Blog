//动态时间
const timespan = document.querySelector('.timeshow span')
setInterval(() => {
  let time = new Date()
  timespan.innerText = time.getHours() + ':' + time.getMinutes() + ':' + (time.getSeconds() <= 9 ? '0' + time
    .getSeconds() : time.getSeconds())
}, 1000)


//留言input焦点事件
inputab()

function inputab() {
  let onfocusnum = 0;
  document.querySelectorAll('.userinformation label input').forEach((item, index) => {
    item.addEventListener('focus', () => {
      document.querySelectorAll(".userinformation label input")[onfocusnum].setAttribute("class", "te");
      onfocusnum = index;
      document.querySelectorAll(".userinformation label input")[onfocusnum].setAttribute("class", "te active");
    })
  })
}


//点击调用留言框
let exit = document.querySelectorAll('.exit')
let im = 0
let messageinfo = document.querySelector('.messageinfo')
let userpl = document.querySelectorAll('.userpl')

document.querySelectorAll('.itemright span').forEach((item, index) => {
  item.addEventListener('click', function(e) {
    messageinfo.style.display = "none";
    exit[index+1].style.display = "block";
    userpl[im].style.display = "none";
    im = index
    userpl[index].style.display = "block";
    exit[index+1].addEventListener('click', function() {
      userpl[index].style.display = "none";
      messageinfo.style.display = "block";
    })
  })
})
