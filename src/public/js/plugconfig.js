var mySwiper = new Swiper('.swiper-container', {
  autoplay: {
    delay: 3000, //控制时间
    disableOnInteraction: true,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next', //对应左边按钮类名
    prevEl: '.swiper-button-prev', //对应右边按钮类名
  },
  initialSlide: 0,
  loop: true,
  parallax: true,
  disableOnInteraction: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  }
})



// const E = window.wangEditor
// const editor = new E('.messageinput')
// const $text1 = $('#text1')
// editor.config.menus = [
//   'emoticon',
// ]
// editor.config.onchange = function (html) {
//     // 第二步，监控变化，同步更新到 textarea
//     $text1.val(html)
// }
// editor.config.zIndex = 4
// editor.config.showFullScreen = false   
// editor.config.focus = false
// editor.config.placeholder = '想说就说点什么吧！'


// editor.create()
// $text1.val(editor.txt.html())
// let eds = document.getElementsByClassName('w-e-text-container')    //修改编辑器高度
// eds[0].style = eds[0].style.cssText + 'height: 210px'