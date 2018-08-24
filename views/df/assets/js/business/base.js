let pageUl = document.querySelector('.pagination ul')

let booksCon = document.getElementById('books')

//页面刷新时查询数据库的开始索引
let start = 0
let pageOfItem = 3

initPageNum('/getPageNum')
getData(start, pageOfItem, '/getBooks')
searchBook()
submitInfo()

//获取数据
function getData(start, end, url) {

  ajax({
    method: 'POST',
    url: url,
    data: {
      start: start,
      end: end
    },
    success: function (data) {
      let arrBooks = JSON.parse(data)
      let inHTML = generateBookList(arrBooks)
      booksCon.innerHTML = inHTML
    },
    error: function (err) {
      console.log(err);
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
      selectFavor()
    },
    error: function (err) {
      console.log(err)
    }
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
    li.addEventListener('click', function (e) {
      e = e || event
      if (e.target.innerText !== '意向/取消') {
        return
      }

      let bookName = (li.children[1].children[0].innerText).split(':')[1]
      let auth = (li.children[1].children[1].innerText).split(':')[1]
      let printer = (li.children[1].children[2].innerText).split(':')[1]

      if (li.flag) {
        li.style.border = '1px solid red'

        //选中则添加到books里
        books[currentPage + li.index] = {
          书名: bookName,
          作者: auth,
          出版社: printer
        }
        li.flag = false
      } else {
        li.style.border = '1px solid #fff'
        delete books[currentPage + li.index] //不选中则移除
        li.flag = true
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

    console.log(inputPhone.value.length > 5);


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
          if (!li.flag) {
            li.flag = !li.flag
            li.style.border = '1px solid #fff'
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
    getData(e.target.innerText, pageOfItem, '/getBooks')
  })
}

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