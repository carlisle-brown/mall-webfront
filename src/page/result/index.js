/*
 * @Description: 操作结果逻辑
 * @Author:  Carlisle
 * @Date: 2020-08-13 13:25:09
 * @LastEditTime: 2020-08-20 13:04:54
 */
require('./index.css')
require('page/common/nav-simple/index.js')
var _bm = require('util/bm.js')

$(function(){
	var type = _bm.getUrlParam('type') || 'default',
	$element = $('.' + type + '-success')
	if(type === 'payment'){
		var orderNumber = _bm.getUrlParam('orderNumber'),
			$orderNumber = $element.find('.order-number');
		$orderNumber.attr('href', $orderNumber.attr('href') + orderNumber)
	}
	// 显示对应的提示元素
	$element.show()
})