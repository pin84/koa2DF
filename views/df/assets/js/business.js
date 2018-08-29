let pageUl = document.querySelector('.pagination ul')

let booksCon = document.getElementById('books')

//页面刷新时查询数据库的开始索引
let start = 0
let pageOfItem = 12

initPageNum('/getPageNum')
getData(start, pageOfItem, '/getBooks')
searchBook()
submitInfo()


//获取数据
function getData(start, end, url) {
  let startpage = start*end
  ajax({
    method: 'post',
    url: url,
    data: {
      start:startpage,
      end:end
    },
    success: function (data) {
      let arrBooks = JSON.parse(data)
      // console.log('getdata  success',data);
      let inHTML = generateBookList(arrBooks)
      booksCon.innerHTML = inHTML
      selectFavor()
    }
  })
}

//获取页数总数 并添加到页面上。成功后执行 selectFavor()
function initPageNum(url) {
  ajax({
    method: 'get',
    url: url,
    success: function (data) {
      let pageCount = Math.ceil(JSON.parse(data)[0].count / pageOfItem)
      let liFragment = generatePage(pageCount)
      pageUl.appendChild(liFragment)
      pageClick(pageUl)
    },
    error: function (err) {
      console.log(err)
    }
  })
}

//生成成码
function generatePage(pageCount) {
  let fragment = document.createDocumentFragment()
  for (let i = 0; i < pageCount; i++) {
    let li = document.createElement('li')
    let a = document.createElement('a')
    a.innerText = i + 1
    a.href = 'javascript:;'
    li.appendChild(a)
    fragment.appendChild(li)
  }
  fragment.children[0].className = 'current'
  return fragment
}


//用户意向框
let books = {}
function selectFavor() {
  let noteListLi = document.querySelectorAll('#books .item')
  let arrLis = Array.prototype.slice.call(noteListLi)
  //==01开始==拿到当前的页码数，并和li.index 合并一起做为books对象key,用户翻页后选中的书信息也能存到一个对象中
  let pageLiNodeList = document.querySelectorAll('.pagination ul li')
  // let pageLiNodeList = pageUl.querySelectorAll('li')
  

  let currentPage
  pageLiNodeList.forEach(function (li) {
    if (li.className === 'current') {
      currentPage = li.innerText.replace(/[\r\n]/g, '')
    }
  })
  //==01结束==
  arrLis.map(function (li, index) {
    li.flag = true
    li.index = index
    let divFavor  = li.querySelector('.favor')

    li.addEventListener('click', function (e) {
      e = e || event
      if (e.target.innerText !== '意向/取消') {
        return
      }

      let bookName = (li.children[1].children[0].innerText).split(':')[1]
      let auth = (li.children[1].children[1].innerText).split(':')[1]
      let printer = (li.children[1].children[2].innerText).split(':')[1]
      
      if (li.flag) {
        // li.style.border = '1px solid red'
        divFavor.style.opacity = '1'

        //选中则添加到books里
        // books[currentPage + li.index] = {
        //   书名: bookName,
        //   作者: auth,
        //   出版社: printer
        // }

        books[bookName] = {
          作者: auth,
          出版社: printer
        }
        li.flag = false
      } else {
        divFavor.style.opacity = '0'
        delete books[bookName] //不选中则移除
        li.flag = true
      }
    })

    li.addEventListener('mouseenter',function(){
      divFavor.style.opacity = '1'
      
    })
    li.addEventListener('mouseleave',function(){
      if(li.flag){
        divFavor.style.opacity = '0'
      }
    })


  })
}


function submitInfo() {
  let btnSubmit = document.querySelector('.info .submit'),
    btnCancle = document.querySelector('.info .cancle'),
    inputName = document.querySelector('.info .name'),
    inputPhone = document.querySelector('.info .phone')
  btnSubmit.addEventListener('click', function (e) {
    let noteListLi = document.querySelectorAll('#books .item')
    if (!inputName.value || !inputPhone.value) {
      alert('请输入姓名及联系方式')
      return
    }
    if (inputPhone.value.length < 9) {
      alert('请输入正确的联系方式')
      return
    }
    if (JSON.stringify(books) === '{}') {
      alert('请选择书藉')
      return
    }
    let jsonBooks = JSON.stringify(books)
    ajax({
      method: 'post',
      url: '/favor',
      data: {
        books: jsonBooks,
        name: inputName.value,
        phone: inputPhone.value
      },
      success: function () {
        books = {}
        inputName.value = ''
        inputPhone.value = ''
        noteListLi.forEach(function (li) {
          let divFavor  = li.querySelector('.favor')
          if (!li.flag) {
            li.flag = !li.flag
            divFavor.style.opacity = '0'
          }
        })
        alert('信息提交成功，我们会在24小时内联系您。')
      }

    })
  })

  btnCancle.addEventListener('click', function () {
    inputName.value = ''
    inputPhone.value = ''
    
  })
  // return false
}


//书的搜索 (如果不输入关键字。则最大会显示 pageOfItem 本书。在sql语句修改)
function searchBook() {
  let inputText = document.querySelector('.inputText')
  let btnSearch = document.querySelector('.btnSearch')
  btnSearch.addEventListener('click', function (e) {

    e = e || event
    let text = inputText.value

    ajax({
      method: 'post',
      url: '/searchBook',
      data: {
        keyword: text,
        // start: startPage - 1,
        // end: pageOfItem
      },
      success: function (data) {
        let searchBooks = JSON.parse(data)
        booksCon.innerHTML = ''
        pageUl.innerHTML = ''
        searchBooks.length > pageOfItem ? searchBooks.length = pageOfItem : searchBooks
        let inHtml = generateBookList(searchBooks)

        // let pageCount = Math.ceil(searchBooks[0].isum / pageOfItem)
        let pageLi = generatePage(1) //搜索结果合成一页显示
        booksCon.innerHTML = inHtml
        pageUl.appendChild(pageLi)

        selectFavor()
      }
    })

    //  getData(index, pageOfItem, '/searchBook', text)
  })
  return false
}

//页码的点击事件
function pageClick(elem) {
  elem.addEventListener('click', function (e) {
    e = e || event
    //切换className
    e.target.parentNode.className = 'current'
    siblingsRemoveClass(e.target.parentNode)
    //获取相应的数据
    getData(e.target.innerText-1, pageOfItem, '/getBooks')
  })
}



//生成书列表
function generateBookList(postData) {
  let str = ''
  for (let i = 0; i < postData.length; i++) {
    str +=
      `
          <li class='item'>
          <div class="imgbox">
            <img src="../../uploads/${postData[i].src}">
          </div>
          <div class="detail">
            <h3>书名:${postData[i].title}</h3>
            <div class="auth">作者:${postData[i].auth}</div>
            <div class="price">出版社:${postData[i].printer}</div>
          </div>
          <div class="favor" title='想要了解本书的更多信息，请选中后点击"请联系我"，我们会在24小内和您联系'>
            <span>意向/取消</span>
          </div>
        </li>
      `
  }
  return str
}


// 页务范围页面 左边小红色三角形的控制 
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



//页码数外理
/*
function handlerPage(target) {
  // let arrLi = Array.prototype.slice.call(oLi)
  let numInnerHTML = Number.parseInt(target.children[0].innerHTML)

  //步数
  let step = target.index + 1 - 5

  //如果点击的元素内的页数小于5，则算出元素和1的差值 ，并赋给step
  if (numInnerHTML < 5) {
    step = 1 - Number.parseInt(arrLi[0].children[0].innerHTML)
  }

  arrLi.map((item) => {
    item.children[0].innerHTML = Number.parseInt(item.children[0].innerHTML) + step
  })
}
*/

//原生的方法拿到兄弟元素，并把className 去掉
function siblingsRemoveClass(elem) {
  let previ = elem.previousSibling;//返回当前节点的前一个兄弟节点,没有则返回null.
  while (previ) {
    if (previ.nodeType === 1) {
      previ.className = ''
    }
    previ = previ.previousSibling
  }

  let nexts = elem.nextSibling
  while (nexts) {
    if (nexts.nodeType === 1) {
      nexts.className = ''
    }
    nexts = nexts.nextSibling
  }
}
