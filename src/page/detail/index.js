require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _bm             = require('util/bm.js');
var _product        = require('service/product-service.js');
var _cart        = require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        productId : _bm.getUrlParam('productId') || '',
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        if(!this.data.productId){
            _bm.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        
    },
    // 加载详情数据
    loadDetail : function(){
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>')
        
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            html = _bm.renderHtml(templateIndex,res)
            $('.page-wrap').html(html);
        }, function(errMsg){
            $('.page-wrap').html('<p class="err-tip">此商品未找到</p>')
        })
    },
    
    filter:function(data){
        data.subImages = data.subImages.split(',')
    }
};
$(function(){
    page.init();
})