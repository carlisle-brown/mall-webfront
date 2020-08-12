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
	data : {
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
		// 输入用户名后下一步按钮的点击
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            // 用户名存在
            if(username){
                _user.getQuestion(username, function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else{
                formError.show('请输入用户名');
            }
		});
		// 输入密码提示问题答案的按钮点击
		$('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            // 密码提示问题答案存在
            if(answer){
            	// 检查密码提示问题答案
                _user.checkAnswer({
                	username:_this.data.username,
                	question:_this.data.question,
                	answer:answer
                }, function(token){
                    _this.data.answer = answer;
                    _this.data.token = token;
                    _this.loadStepPassword();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 问题答案不存在
            else{
                formError.show('请输入密码提示问题的答案');
            }
		});
		// 输入新密码的按钮点击
		$('#submit-password').click(function(){
            var passowrd = $.trim($('#passowrd').val());
            // 新密码存在
            if(password){
            	// 检查密码提示问题答案
                _user.resetPassword({
                	username:_this.data.username,
                	passowrdNew:passowrd,
                	forgetToken:_this.data.token
                }, function(res){
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 密码为空
            else{
                formError.show('请输入不少于6位的新密码');
            }
		});
	},
	// 加载第一步
	loadStepUsername:function(){
		$('.step-username').show();
	},
	// 加载第二步
	loadStepQuestion:function(){
		formError.hide()
		$('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question)
	},
	// 加载第三步
	loadStepPassword:function(){
		formError.hide()
		$('.step-question').hide().siblings('.step-password').show()
	}
};
$(function(){
	page.init();
});
