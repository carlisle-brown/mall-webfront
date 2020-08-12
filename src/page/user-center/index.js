require('page/common/nav/index.js')
require('page/common/header/index.js')
require('./index.css')
var navSide = require('page/common/nav-side/index.js')
var _bm = require('util/bm.js')
var _user = require('service/user-service')
var templateIndex = require('./index.string')

// page 逻辑部分
var page = {
    init:function(){
        this.onLoad();
    },
    onLoad:function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        })
        // 加载个人信息
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo:function () {
        var userHtml = ''
        _user.getUserInfo(function (res) {
            userHtml = _bm.renderHtml(templateIndex, res)
            $('.panel-body').html(userHtml)
        }, function (errMsg) {
            _bm.errorTips(errMsg)
        })
    }
};
$(function(){
    page.init();
});