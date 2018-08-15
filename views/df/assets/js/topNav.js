
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






//原生实现jq的 siblings 方法  返回 elem 元素的兄弟元素
function siblings(elem) {
  let nodes = []
  let previ = elem.previousSibling //返回当前节点的前一个兄弟节点,没有则返回null.
  while (previ) {
    if (previ.nodeType === 1) {
      nodes.push(previ)
    }
    previ = previ.previousSibling
  }
  nodes.reverse()//把顺序反转一下 这样元素的顺序就是按先后的了 

  let nexts = elem.nextSibling
  while (nexts) {
    if (nexts.nodeType === 1) {
      nodes.push(nexts)
    }
    nexts = nexts.nextSibling
  }
  return nodes
}
