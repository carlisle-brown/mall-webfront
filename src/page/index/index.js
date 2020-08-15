require('./index.css')
require('page/common/nav/index.js')
require('page/common/header/index.js')
require('util/slider/index.js')
var navSide = require('page/common/nav-side/index.js')
var tempalteBanner = require('./index.string')
var _bm = require('util/bm.js')

$(function() {
    // 渲染banner
    var bannerHtml = _bm.renderHtml(tempalteBanner)
    $('.banner-con').html(bannerHtml)
    // 初始化banner
    var $slider = $('.banner').unslider({
        dots:true
    });
    // 前一张后一张操作
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev')?'prev':'next';
        $slider.data('unslider')[forward]();
    })
});