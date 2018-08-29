let weixin = document.querySelector('.weixin'),
weixinUse = weixin.querySelector('use'),
weibo = document.querySelector('.weibo'),
weiboUse = weibo.querySelector('use'),
qq = document.querySelector('.qq'),
qqUse = qq.querySelector('use'),
mail = document.querySelector('.mail'),
mailUse = mail.querySelector('use')

// weixin
enterEv(weixin,weixinUse,'#icon-weixin')
leaveEv(weixin,weixinUse,'#icon-weixin-1')

// weibo
enterEv(weibo,weiboUse,'#icon-weibo-1')
leaveEv(weibo,weiboUse,'#icon-weibo')

// qq
enterEv(qq,qqUse,'#icon-qq-1')
leaveEv(qq,qqUse,'#icon-qq')

// mail
enterEv(mail,mailUse,'#icon-mail-1')
leaveEv(mail,mailUse,'#icon-mail')


// 通用方法
function enterEv(obj,obj1,value){
  obj.addEventListener('mouseenter',() => {
    obj1.href.baseVal = value
  })
}
function leaveEv(obj,obj1,value){
  obj.addEventListener('mouseleave',() => {
    obj1.href.baseVal = value
  })
}