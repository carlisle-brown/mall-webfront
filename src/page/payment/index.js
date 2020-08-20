/*
 * @Description: 订单支付逻辑
 * @Author:  Carlisle
 * @Date: 2020-08-20 00:04:46
 * @LastEditTime: 2020-08-20 12:52:04
 */
require("page/common/nav/index.js");
require("page/common/header/index.js");
require("./index.css");
var _bm = require("util/bm.js");
var _payment = require("service/payment-service");
var templateIndex = require("./index.string");

// page 逻辑部分
var page = {
  data: {
    orderNumber: _bm.getUrlParam("orderNumber"),
  },
  init: function () {
    this.onLoad();
  },
  onLoad: function () {
    this.loadPaymentInfo();
  },
  // 加载订单列表
  loadPaymentInfo: function () {
    var paymentHtml = "",
      _this = this,
      $pageWrap = $(".page-wrap");
    $pageWrap.html('<div class="loading"></div>');
    _payment.getPaymentInfo(
      this.data.orderNumber,
      function (res) {
        paymentHtml = _bm.renderHtml(templateIndex, res);
        $pageWrap.html(paymentHtml);
        _this.listenOrderStatus();
      },
      function (errMsg) {
        $pageWrap.html('<p class="err-tip">' + errMsg + "</p>");
      }
    );
  },
  //   监听订单状态
  listenOrderStatus: function () {
    var _this = this;
    this.paymentTimer = window.setInterval(function () {
      _payment.getPaymentStatus(
        _this.data.orderNumber,
        function (res) {
            if(res == true){
                window.location.href = './result/html?type=payment&orderNumber=' + _this.data.orderNumber;
            }
        },
        function (errMsg) {}
      );
    }, 5e3);
  },
};
$(function () {
  page.init();
});
