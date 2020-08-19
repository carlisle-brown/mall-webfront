/*
 * @Description: ()
 * @Author:  
 * @Date: 2020-08-17 16:41:48
 * @LastEditTime: 2020-08-19 23:01:03
 * @LastEditors:  
 */

'use strict';

var _bm = require('util/bm.js');

var _order = {
    // 获取商品列表
    getProductList : function(resolve, reject){
        _bm.request({
            url     : _bm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    // 提交订单
    createOrder : function(orderInfo, resolve, reject){
        _bm.request({
            url     : _bm.getServerUrl('/order/create.do'),
            data	: orderInfo,
            success : resolve,
            error   : reject
        });
    },
    // 获取订单列表
    getOrderList : function(listParam, resolve, reject){
        _bm.request({
            url     : _bm.getServerUrl('/order/list.do'),
            data	: listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取订单详情
    getOrderDetail : function(orderNumber, resolve, reject){
        _bm.request({
            url     : _bm.getServerUrl('/order/detail.do'),
            data	: {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 取消订单
    cancelOrder : function(orderNumber, resolve, reject){
        _bm.request({
            url     : _bm.getServerUrl('/order/cancel.do'),
            data	: {
                orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _order;