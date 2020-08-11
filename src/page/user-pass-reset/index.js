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
	data:{
		username:'',
		question:'',
		answer:'',
		token:''
	},
	init:function(){
		this.onLoad()
		this.bindEvent();
	},
	onLoad:function(){
		this.loadStepUsername()
	},
	bindEvent:function(){
		var _this = this;
		$('#submit-username').click(function(){
			var usernmae = $.trim($('#username').val())
			if(usernmae){
				_user.getQuestion(username,function(res){
					_this.data.username = username
					_this.data.question = res
					_this.loadStepQuestion();
				},function(errMsg){
					formError.show(errMsg)
				});
			}else{
				formError.show('请输入用户名')
			}
		})
	},
	// 加载第一步
	loadStepUsername:function(){
		$('.step-username').show();
	},
	// 加载第二步
	loadStepQuestion:function(){
		console.log('进入方法了')
		formError.hide()
		$('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question)
	},
	// 加载第三步
	loadStepPassword:function(){

	}
};
$(function(){
	page.init();
});
