
'use strict';

var _bm = require('util/bm.js');

var _address = {
    // 获取地址列表
    getAddressList : function(resolve, reject){
        _bm.request({
            url     : _bm.getServerUrl('/shipping/list.do'),
            data: {
            	pageSize: 50
            },
            success : resolve,
            error   : reject
        });
    },
    // 新建地址
    save : function(addressInfo, resolve, reject){
        _bm.request({
            url     : _bm.getServerUrl('/shipping/add.do'),
            data : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 更新地址
    update : function(addressInfo, resolve, reject){
        _bm.request({
            url     : _bm.getServerUrl('/shipping/update.do'),
            data : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    deleteAddress : function(shippingId, resolve, reject){
        _bm.request({
            url     : _bm.getServerUrl('/shipping/del.do'),
            data : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取单条地址信息
    getAddress: function(shippingId, resolve, reject){
        _bm.request({
            url     : _bm.getServerUrl('/shipping/select.do'),
            data : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _address;