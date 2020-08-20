require('./index.css')
require('page/common/nav-simple/index.js')
var _bm = require('util/bm.js')
var _user   = require('service/user-service.js')

var formError = {
	show:function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide:function(errMsg){
		$('.error-item').hide().find('.err-msg').text('');
	}
}

// page 逻辑部分
var page = {
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		$('#submit').click(function(){
			_this.submit();
		})
		$('.user-content').keyup(function(e){
			if(e.keyCode===13){
				_this.submit();
			}
		})
	},
	// 提交表单
	submit:function(){
		var formData = {
			username:$.trim($('#username').val()),
			password:$.trim($('#password').val()),
		},
		validateResult = this.formValidate(formData);
		if(validateResult.status){
			_user.login(formData, function(res){
				window.location.href = _bm.getUrlParam('redirect') || './index.html';
			}, function(errMsg){
				formError.show(errMsg);
			});
		}else{
			formError.show(validateResult.msg);
		}
	},
	formValidate:function(formData){
		var result = {
			status:false,
			msg:''
		};
		if(!_bm.validate(formData.username,'require')){
			result.msg='用户名不能为空';
			return result;
		}
		if(!_bm.validate(formData.password,'require')){
			result.msg='密码不能为空';
			return result;
		}
		result.status = true;
		result.msg='验证通过';
		return result
	}
};
$(function(){
	page.init();
});