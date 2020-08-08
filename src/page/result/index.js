require('./index.css')
require('page/common/nav-simple/index.js')
var _bm = require('util/bm.js')

$(function(){
	var type = _bm.getUrlParam('type') || 'default',
	$element = $('.' + type + '-success')
	// 显示对应的提示元素
	$element.show()

})