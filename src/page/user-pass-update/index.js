require('page/common/nav/index.js')
require('page/common/header/index.js')
require('./index.css')
var navSide = require('page/common/nav-side/index.js')
var _bm = require('util/bm.js')
var _user = require('service/user-service')

// page 逻辑部分
var page = {
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        })
    },
    // 验证字段信息
    valdateFrom:function(formData){
        var result = {
			status:false,
			msg:''
		};
		if(!_bm.validate(formData.password,'require')){
			result.msg='原密码不能为空';
			return result;
		}
		if(!formData.passwordNew || formData.passwordNew.length < 6){
			result.msg='密码长度不得少于6位';
			return result;
		}
		if(formData.passwordNew !== formData.passwordConfirm){
			console.log(formData.question)
			result.msg='两次密码不一致';
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
                password:$.trim($('#password').val()),
                passwordNew:$.trim($('#password-new').val()),
                passwordConfirm:$.trim($('#password-confirm').val()),
            },
            validateResult = _this.valdateFrom(userInfo);
            if(validateResult.status){
                // 更改用户密码
                _user.updatePassword({
                    passwordOld: userInfo.password,
                    passwordNew: userInfo.passwordNew
                }, function(res,msg){
                    _bm.successTips(msg);
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