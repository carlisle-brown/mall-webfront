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
        var _this = this;
        $(document).on('mouseenter', '.p-img-item', function(){
            var imageUrl   = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        $(document).on('click', '.p-count-btn', function(){
            console.log('添加数据')
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-count'),
                currCount   = parseInt($pCount.val()),
                minCount    = 1,
                maxCount    = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                 $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }else{
                 $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        $(document).on('click', '.cart-add', function(){
             _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
             },function(res){
                window.location.href = './result.html?type=cart-add';
            },function(errMsg){
                _bm.errorTips(errMsg)
            });
        });
    },
    // 加载详情数据
    loadDetail : function(){
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>')
        
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            _this.data.detailInfo = res;
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