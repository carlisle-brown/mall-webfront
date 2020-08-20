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
        this.bindEvent();
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
    },
    // 验证字段信息
    valdateFrom:function(formData){
        var result = {
			status:false,
			msg:''
		};
		if(!_bm.validate(formData.phone,'phone')){
			result.msg='手机号格式不正确';
			return result;
		}
		if(!_bm.validate(formData.email,'email')){
			result.msg='邮箱格式不正确';
			return result;
		}
		if(!_bm.validate(formData.question,'require')){
			console.log(formData.question)
			result.msg='密码提示问题不能为空';
			return result;
		}
		if(!_bm.validate(formData.answer,'require')){
			result.msg='密码提示问题答案不能为空';
			return result;
		}
		result.status = true;
		result.msg='验证通过';
		return result
    },
    bindEvent:function(){
        var _this = this
        // 点击提交按钮后的行为
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                phone:$.trim($('#phone').val()),
                email:$.trim($('#email').val()),
                question:$.trim($('#question').val()),
                answer:$.trim($('#answer').val()),
            },
            validateResult = _this.valdateFrom(userInfo);
            if(validateResult.status){
                // 更改用户信息
                _user.updateUserInfo(userInfo, function(res,msg){
                    _bm.successTips(msg);
                    window.location.href='./user-center.html'
                }, function(errMsg){
                    _bm.errorTips(errMsg);
                });
            }else{
                _bm.errorTips(validateResult.errMsg);
            }
        })
    }
};
$(function(){
    page.init();
});