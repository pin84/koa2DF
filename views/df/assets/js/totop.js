
//返回顶部
let toTop = document.querySelector('.toTop')
window.onscroll = function () {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop > 30) {
    toTop.style.opacity = '1'
  } else {
    toTop.style.opacity = '0'
  }
}
let timerId = null
toTop.addEventListener('click', function () {
  if (timerId) {
    clearInterval(timerId)
  }
  timerId = setInterval(function () {
    let target = 0, step = 20,
      current = document.documentElement.scrollTop || document.body.scrollTop

    if (current > target) {
      step = -Math.abs(step)
    }
    console.log(step)
    if (Math.abs(current - target) <= Math.abs(step)) {
      clearInterval(timerId)
      document.documentElement.scrollTop = target
      document.body.scrollTop = target
      return
    }
    current += step
    document.documentElement.scrollTop = current
    document.body.scrollTop = current
  }, 10)
})


//顶部导航条切换
let navUl = document.querySelector('.nav-link ul')
let nodeListNavLi = navUl.querySelectorAll('.nav-link ul li')
let navLi = Array.prototype.slice.call(nodeListNavLi)
let url = window.location.search
function handlerUrl(url) {
  let obj = url.split('=')
  if (obj[1] === '1') {
    navLi.forEach(function(item){
      item.className = ''
    })
    navLi[1].className = 'active'
  }
}

handlerUrl(url)
