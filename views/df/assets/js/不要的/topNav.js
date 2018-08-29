
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