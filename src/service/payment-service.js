/*
 * @Description: 订单支付接口
 * @Author:  Carlisle
 * @Date: 2020-08-20 11:54:57
 * @LastEditTime: 2020-08-20 12:53:54
 */
var _bm = require('util/bm.js');

var _payment = {
    // 获取支付信息
    getPaymentInfo : function(orderNumber, resolve, reject){
        _bm.request({
            url     : _bm.getServerUrl('/order/pay.do'),
            data    : {
              orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取订单状态
    getPaymentStatus : function(orderNumber, resolve, reject){
        _bm.request({
            url     : _bm.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
              orderNo : orderNumber
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _payment;