let nodeListA = document.querySelectorAll('.list ul li a')
let nodeListUse = document.querySelectorAll('.list ul li a use')

nodeListUse[1].href.baseVal = '#icon-triangle-white'

let arrA = Array.prototype.slice.call(nodeListA)
let index = 0
arrA.forEach(function(item){
  item.index = index
  index++
  item.addEventListener('click',function(e){
    e = e || event
    //每个a标签的背景 (这个循环可以改进)
    arrA.forEach(function(item){
      item.className = ''
    })
    item.className = 'active'
    
    //小三角形
    let arrUse = Array.prototype.slice.call(nodeListUse)
    arrUse.forEach(function(use){
      use.href.baseVal = '#icon-triangle-red'
    })
    nodeListUse[e.target.index].href.baseVal = '#icon-triangle-white'
  })
  
})

//这个方法没用到
//原生实现jq的 siblings 方法 并把相邻的元素的class清除 
function siblings(elem) {
  // let nodes = []
  let previ = elem.previousSibling //返回当前节点的前一个兄弟节点,没有则返回null.
  while (previ) {
    if (previ.nodeType === 1) {
      console.log(previ)
      previ.className = ''
      // nodes.push(previ)
    }
    previ = previ.previousSibling
  }
  // nodes.reverse()//把顺序反转一下 这样元素的顺序就是按先后的了 

  let nexts = elem.nextSibling
  while (nexts) {
    if (nexts.nodeType === 1) {
      nexts.className = ''
      // nodes.push(nexts)
    }
    nexts = nexts.nextSibling
  }
  //不设返回值 
  // return nodes
}