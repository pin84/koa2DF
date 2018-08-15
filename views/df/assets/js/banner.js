/**
 * 用 swiper 插件实现图个轮播
 */ 
/* 不用做轮播
var swiper = new Swiper('.banner', {
  slidesPerView: 1,
  // spaceBetween: 30,
  loop: true,
  speed:1000,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
    transitionDuration: 4000
  },
});

*/
var swiper = new Swiper('.show', {
  slidesPerView: 3,
  spaceBetween: 5,
  slidesPerGroup: 1,
  speed: 500,
  loop: true,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});